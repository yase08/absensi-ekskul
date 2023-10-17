import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { comparePassword, hashPassword } from "../libs/bcrypt.lib";
import jwt from "jsonwebtoken";
import { createPasswordResetToken, hashToken } from "../libs/crypto.libs";
import { sendMailer } from "../libs/nodemailer.lib";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");
const jwtSecret = process.env.SECRET_KEY as string;

export class AuthService {
  async loginService(req: Request): Promise<any> {
    try {
      const user = await db.user.findOne({ where: { email: req.body.email } });

      if (!user)
        throw apiResponse(status.BAD_REQUEST, "Email is not registered");

      const hashedPassword = await comparePassword(
        user.password,
        req.body.password
      );

      if (!hashedPassword)
        throw apiResponse(status.BAD_REQUEST, "Incorect email or password");

      const userOnEkskul = await db.userOnEkskul.findAll({
        where: { user_id: user.id },
      });
      const ekskulIds = userOnEkskul.map((userEkskul) => userEkskul.ekskul_id);

      const token = jwt.sign(
        {
          id: user.id,
          email: req.body.email,
          name: user.name,
          image: user.image,
          role: user.role,
          ekskul: ekskulIds,
        },
        jwtSecret,
        { expiresIn: "1d" }
      );

      return Promise.resolve(
        apiResponse(status.OK, "Login success", token, undefined)
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
        throw apiResponse(status.BAD_REQUEST, "Email is not registered");
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
        apiResponse(status.OK, "Reset link has been sent to your email", data)
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
        apiResponse(status.BAD_REQUEST, "Token expired, please try again");
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
        apiResponse(status.OK, "Successfully changed password")
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
}
