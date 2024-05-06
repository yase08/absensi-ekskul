import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../libs/bcrypt.lib";
import jwt from "jsonwebtoken";
import { createPasswordResetToken, hashToken } from "../libs/crypto.libs";
import { sendMailer } from "../libs/nodemailer.lib";
import { Op } from "sequelize";
import { ISession } from "@/interfaces/user.interface";
import fs from "fs";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class AuthService {
  async loginService(req: Request, res: Response): Promise<any> {
    try {
      const user = await db.user.findOne({
        where: { email: req.body.email },
        include: [
          {
            model: db.ekskul,
            attributes: ["id", "name"],
            as: "ekskuls",
          },
        ],
      });

      if (!user) throw apiResponse(status.BAD_REQUEST, "Email tidak terdaftar");

      const hashedPassword = await comparePassword(
        user.password,
        req.body.password
      );

      if (!hashedPassword)
        throw apiResponse(
          status.BAD_REQUEST,
          "Password salah atau email salah"
        );

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          role: user.role,
          ekskuls: user.ekskuls
            ? user.ekskuls.map((ekskul) => {
                return {
                  id: ekskul.id,
                  name: ekskul.name,
                };
              })
            : null,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          role: user.role,
          ekskuls: user.ekskuls
            ? user.ekskuls.map((ekskul) => {
                return {
                  id: ekskul.id,
                  name: ekskul.name,
                };
              })
            : null,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      await db.user.update(
        { isActive: true, refreshToken: refreshToken },
        { where: { id: user.id } }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return Promise.resolve(
        apiResponse(status.OK, "Login berhasil", {
          accessToken: token,
          role: user.role,
        })
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async refreshService(req: Request, res: Response): Promise<any> {
    try {
      const refreshToken = req.cookies.jwt;

      if (!refreshToken) throw apiResponse(status.UNAUTHORIZED, "Unauthorized");

      const user = await db.user.findOne({
        where: { refreshToken: refreshToken },
        include: [
          {
            model: db.ekskul,
            attributes: ["id", "name"],
            as: "ekskuls",
          },
        ],
      });

      if (!user) throw apiResponse(status.FORBIDDEN, "Forbidden");

      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET as string,
          (err: any, decoded: any) => {
            if (err || decoded.id !== user.id) {
              reject(err || "Forbidden");
            } else {
              resolve(decoded);
            }
          }
        );
      });

      const accessToken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          role: user.role,
          ekskuls: user.ekskuls
            ? user.ekskuls.map((ekskul) => {
                return {
                  id: ekskul.id,
                  name: ekskul.name,
                };
              })
            : null,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      return apiResponse(status.OK, "Refresh token", {
        accessToken: accessToken,
        role: user.role,
      });
    } catch (error: any) {
      return apiResponse(
        error.statusCode || status.INTERNAL_SERVER_ERROR,
        error.statusMessage,
        error.message
      );
    }
  }

  async logoutService(req: Request, res: Response): Promise<any> {
    try {
      const refreshToken = req.cookies.jwt;

      if (!refreshToken) throw apiResponse(status.UNAUTHORIZED, "Unauthorized");

      const user = await db.user.findOne({
        where: { refreshToken: refreshToken },
      });

      if (!user) {
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        return Promise.resolve(apiResponse(status.OK, "Logout berhasil"));
      }

      await db.user.update(
        { isActive: false, refreshToken: null },
        { where: { id: user.id } }
      );

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return Promise.resolve(apiResponse(status.OK, "Logout berhasil"));
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async getCountService(req: Request): Promise<any> {
    try {
      const adminCount = await db.user.count({ where: { role: "admin" } });
      const instructorCount = await db.user.count({
        where: { role: "instructor" },
      });
      const studentCount = await db.student.count();
      const activeUserCount = await db.user.count({
        where: { isActive: true },
      });

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan data", {
          adminCount,
          instructorCount,
          studentCount,
          activeUserCount,
        })
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async registerService(req: Request): Promise<any> {
    // try {
    //   const emailArray: string[] = req.body.name.split(" ");
    //   let password: string = "";
    //   let email: string = "";
    //   for (const namePart of emailArray) {
    //     email = `${namePart}@smkwikrama.sch.id`; // Tentukan variabel email di sini
    //   }
    //   for (let i = 0; i < 4 && i < emailArray.length; i++) {
    //     password += emailArray[i].slice(0, 1); // Mengambil satu karakter pertama dari setiap bagian nama
    //   }
    //   // Mengambil 4 angka terakhir dari NIS
    //   const nisLast4: string = req.body.nis.slice(-4);
    //   // Menggabungkan 4 angka terakhir dari NIS ke dalam password
    //   password += nisLast4;
    //   const user = await prisma.user.findUnique({ where: { email } }); // Tambahkan await di sini
    //   if (user) throw apiResponse(status.BAD_REQUEST, "User already exists");
    //   const hashedPassword = await hashPassword(password);
    //   const userData = await prisma.user.create({
    //     data: {
    //       ...req.body,
    //       password: hashedPassword,
    //       email: email,
    //       roleId: 1,
    //     },
    //   });
    //   // await prisma.userOnEkskul.create({
    //   //   data: {
    //   //     ekskul: ekskul,
    //   //   },
    //   // });
    //   return Promise.resolve(
    //     apiResponse(status.OK, "Register Success", undefined)
    //   );
    // } catch (error: any) {
    //   return Promise.reject(
    //     apiResponse(
    //       error.statusCode || status.INTERNAL_SERVER_ERROR,
    //       error.statusMessage,
    //       error.message
    //     )
    //   );
    // }
  }

  async forgotPasswordService(req: Request): Promise<any> {
    try {
      const user = await db.user.findOne({ where: { email: req.body.email } });
      if (!user) {
        throw apiResponse(status.BAD_REQUEST, "Email tidak terdaftar");
      }

      const { resetToken, passwordResetToken, passwordResetExpires } =
        await createPasswordResetToken();

      await db.user.update(
        {
          passwordResetToken: passwordResetToken,
          passwordResetExpires: passwordResetExpires,
        },
        { where: { id: user.id } }
      );
      const resetLink = `http://localhost:8000/api/v1/auth/reset-token/${resetToken}`;

      const data = {
        to: req.body.email,
        subject: "Forgot Password",
        html: resetLink,
      };

      sendMailer(data.to, data.subject, data.html);

      return Promise.resolve(
        apiResponse(status.OK, "Silahkan cek email", data)
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async resetTokenService(req: Request): Promise<any> {
    try {
      const hashedToken = await hashToken(req.params.token);

      const user = await db.user.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { [Op.gt]: Date.now() },
      });

      if (!user) {
        apiResponse(
          status.BAD_REQUEST,
          "Token kadaluarsa, silahkan request ulang"
        );
      }

      const updateHashedPassword = await hashPassword(req.body.password);

      await db.user.update(
        {
          password: updateHashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
        },
        { where: { id: user.id } }
      );

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mengubah password")
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async getProfileService(req: Request): Promise<any> {
    try {
      const user_id = req.params.id;

      const paramQuerySQL: any = {
        include: [
          {
            model: db.ekskul,
            as: "ekskuls",
            attributes: ["id", "name"],
          },
        ],
      };

      paramQuerySQL.where = {
        id: user_id,
      };

      const user = await db.user.findOne(paramQuerySQL);

      if (!user) {
        return Promise.resolve(
          apiResponse(status.NOT_FOUND, "User tidak ditemukan")
        );
      }

      const modifiedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        image: user.image,
        role: user.role,
        ekskul: user.ekskuls.map((ekskul) => {
          return {
            id: ekskul.id,
            name: ekskul.name,
          };
        }),
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan user", modifiedUser)
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage || "Internal Server Error",
          error.message || "Internal Server Error"
        )
      );
    }
  }

  async updateProfileService(req: Request): Promise<any> {
    try {
      const user_id = (req.session as ISession).user.id;

      const paramQuerySQL: any = {
        where: {
          id: user_id,
        },
      };

      if (req.body.password) {
        const hashedPassword = await hashPassword(req.body.password);
        req.body.password = hashedPassword;
      }

      if (req.file) {
        req.body.image = req.file.filename;
      }

      const user = await db.user.findOne(paramQuerySQL);

      if (user.image) {
        fs.unlinkSync(`../public/images/${user.image}`);
      }

      if (!user) {
        return Promise.resolve(
          apiResponse(status.NOT_FOUND, "User tidak ditemukan")
        );
      }

      const updateProfile = await db.user.update({
        ...req.body,
      });

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mengupdate profile", updateProfile)
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage || "Internal Server Error",
          error.message || "Internal Server Error"
        )
      );
    }
  }
}
