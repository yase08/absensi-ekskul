import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";
import { hashPassword } from "../libs/bcrypt.lib";
import { ISession } from "../interfaces/user.interface";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class UserService {
  async createUserService(req: Request): Promise<any> {
    try {
      const user = await db.user.findOne({
        where: { email: req.body.email, mobileNumber: req.body.mobileNumber },
      });

      if (user)
        throw apiResponse(
          status.CONFLICT,
          `Pengguna dengan email ${req.body.email} atau nomor telepon ${req.body.mobileNumber} sudah ada`
        );

      let file: Express.Multer.File = req.file as Express.Multer.File;

      if (file) {
        req.body.image = file.path;
      }

      const hashedPassword = await hashPassword(req.body.password);

      const ekskuls = await db.ekskul.findAll({
        where: { id: req.body.ekskuls },
      });

      const createUser = await db.user.create({
        ...req.body,
        password: hashedPassword,
      });

      Promise.all(
        ekskuls.map(async (ekskul) => {
          try {
            const createUserOnEkskuls = await db.userOnEkskul.create({
              user_id: createUser.id,
              ekskul_id: ekskul.id,
            });
            return createUserOnEkskuls;
          } catch (error) {
            console.error(error);
          }
        })
      );

      if (!createUser)
        throw apiResponse(status.FORBIDDEN, "Gagal menambahkan siswa");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil menambahkan siswa")
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

  async getAllUserService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {};
      let limit: number;
      let offset: number;

      const totalRows = await db.user.count();

      if (filter) {
        paramQuerySQL.where = {
          name: {
            [Op.like]: `%${filter}%`,
          },
        };
      }

      paramQuerySQL.where = {
        role: "instructor",
      };

      if (sort) {
        const sortOrder = sort.startsWith("-") ? "DESC" : "ASC";
        const fieldName = sort.replace(/^-/, "");
        paramQuerySQL.order = [[fieldName, sortOrder]];
      }

      if (page && page.size && page.number) {
        limit = parseInt(page.size, 10);
        offset = (parseInt(page.number, 10) - 1) * limit;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      } else {
        limit = 10;
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }

      const user = await db.user.findAll(paramQuerySQL);

      if (!user || user.length === 0)
        throw apiResponse(status.NOT_FOUND, "Pengguna tidak ditemukan");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan pengguna", user, totalRows)
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

  async getAllAdminService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {};
      let limit: number;
      let offset: number;

      if (filter) {
        paramQuerySQL.where = {
          name: {
            [Op.like]: `%${filter}%`,
          },
        };
      }

      paramQuerySQL.where = {
        role: "admin",
      };

      if (sort) {
        const sortOrder = sort.startsWith("-") ? "DESC" : "ASC";
        const fieldName = sort.replace(/^-/, "");
        paramQuerySQL.order = [[fieldName, sortOrder]];
      }

      if (page && page.size && page.number) {
        limit = parseInt(page.size, 10);
        offset = (parseInt(page.number, 10) - 1) * limit;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      } else {
        limit = 10;
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }

      const userFilter = await db.user.findAll(paramQuerySQL);

      if (!userFilter)
        throw apiResponse(status.NOT_FOUND, "Admin tidak ditemukan");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan admin", userFilter)
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

  async updateUserService(req: Request): Promise<any> {
    try {
      const userExist = await db.user.findOne({
        where: { id: req.params.id },
      });

      if (!userExist)
        throw apiResponse(status.NOT_FOUND, "User tidak ditemukan");

      if (req.body.password) {
        const hashedPassword = await hashPassword(req.body.password);
        req.body.password = hashedPassword;
      }

      const updateUser = await db.user.update(
        { ...req.body },
        {
          where: {
            id: userExist.id,
          },
        }
      );

      if (!updateUser)
        throw apiResponse(status.FORBIDDEN, "Gagal mengupdate pengguna");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mengupdate pengguna")
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

  async deleteUserService(req: Request): Promise<any> {
    try {
      const userExist = await db.user.findOne({
        where: { id: req.params.id },
      });

      if (!userExist)
        throw apiResponse(status.NOT_FOUND, "Pengguna tidak ditemukan");

      await db.userOnEkskul.destroy({
        where: {
          user_id: userExist.id,
        },
      });

      await db.user.destroy({
        where: { id: userExist.id },
      });

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil menghapus pengguna")
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
