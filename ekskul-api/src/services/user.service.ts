import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler
const db = require("../db/models/index.js");

export class UserService {
  async createUserService(req: Request): Promise<any> {
    try {
      const user = await db.user.findOne({
        where: { name: req.body.name },
      });

      if (user)
        throw apiResponse(
          status.CONFLICT,
          `Student ${req.body.name} already exist`
        );

      const ekskuls = await db.ekskul.findAll({
        where: { id: req.body.ekskuls },
      });

      const createUser = await db.user.create(req.body);
      await createUser.addEkskul(ekskuls);

      if (!createUser)
        throw apiResponse(status.FORBIDDEN, "Create new user failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new user success")
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

      if (filter) {
        paramQuerySQL.where = {
          name: { [Op.iLike]: `%${filter}%` },
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
        limit = 5;
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }

      const users = await db.user.findAll(paramQuerySQL);

      if (!users) throw apiResponse(status.NOT_FOUND, "Students do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all users success", users)
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
          "Students do not exist for the given member_id"
        );

      const updateStudent = await db.user.update(req.body);

      if (!updateStudent)
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
          "Students do not exist for the given member_id"
        );

      const deleteStudent = await db.user.delete({
        where: { id: userExist.id },
      });

      if (!deleteStudent)
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
