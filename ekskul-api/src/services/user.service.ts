import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";
import { hashPassword } from "../libs/bcrypt.lib";

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
          `User with email ${req.body.email} and mobile number ${req.body.mobileNumber} already exist`
        );

      const hashedPassword = await hashPassword(req.body.password);

      const ekskuls = await db.ekskul.findAll({
        where: { id: req.body.ekskuls },
      });

      const createUser = await db.user.create({
        ...req.body,
        role: "instructor",
        password: hashedPassword,
      });
      
      await createUser.addEkskul(ekskuls);

      if (!createUser)
        throw apiResponse(status.FORBIDDEN, "Create new user failed");

      return Promise.resolve(apiResponse(status.OK, "Create new user success"));
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

      if (filter) {
        paramQuerySQL.where = {
          name: {
            [Op.like]: `%${filter}%`,
          },
        };
      }

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
      const users = await db.user.findAll({
        attributes: ["id", "name"],
      });

      if (!userFilter)
        throw apiResponse(status.NOT_FOUND, "Users do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all users success", {
          userFilter,
          users,
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

  async getUserService(req: Request): Promise<any> {
    try {
      const user = await db.user.findOne({ where: { id: req.params.id } });

      if (!user) throw apiResponse(status.NOT_FOUND, "User do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched user success", user)
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
        throw apiResponse(
          status.NOT_FOUND,
          "User do not exist for the given id"
        );

      const updateUser = await db.user.update(req.body, {
        where: {
          id: userExist.id,
        },
      });

      if (!updateUser)
        throw apiResponse(status.FORBIDDEN, "Update user failed");

      return Promise.resolve(apiResponse(status.OK, "Update user success"));
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
        throw apiResponse(
          status.NOT_FOUND,
          "User do not exist for the given id"
        );

      const deleteUser = await db.user.destroy({
        where: { id: userExist.id },
      });

      if (!deleteUser)
        throw apiResponse(status.FORBIDDEN, "Delete user failed");

      return Promise.resolve(apiResponse(status.OK, "Delete user success"));
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
