import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class ActivityProgramService {
  async createActivityProgramService(req: Request): Promise<any> {
    try {
      const activityProgram = await db.activityProgram.findOne({
        where: { activity: req.body.activity },
      });

      if (activityProgram)
        throw apiResponse(
          status.CONFLICT,
          `Activity program ${req.body.activity} already exist`
        );

      const createActivityProgram = await db.activityProgram.create(req.body);

      if (!createActivityProgram)
        throw apiResponse(
          status.FORBIDDEN,
          "Create new activity program failed"
        );

      return Promise.resolve(
        apiResponse(status.OK, "Create new activity program success")
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

  async getAllActivityProgramService(req: Request): Promise<any> {
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
          activity: {
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

      const activityProgramFilter = await db.activityProgram.findAll(
        paramQuerySQL
      );

      const activityPrograms = await db.activityProgram.findAll({
        attributes: ["id", "activity"],
      });

      if (!activityProgramFilter)
        throw apiResponse(status.NOT_FOUND, "Activity program do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all activity program success", {
          activityProgramFilter,
          activityPrograms,
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

  async getActivityProgramService(req: Request): Promise<any> {
    try {
      const activityProgram = await db.activityProgram.findOne({
        where: { id: req.params.id },
      });

      if (!activityProgram)
        throw apiResponse(status.NOT_FOUND, "Activity program do not exist");

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Fetched activity program success",
          activityProgram
        )
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

  async updateActivityProgramService(req: Request): Promise<any> {
    try {
      const activityProgramExist = await db.activityProgram.findOne({
        where: { id: req.params.id },
      });

      if (!activityProgramExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Activity program do not exist for the given id"
        );

      const updateActivityProgram = await db.activityProgram.update(req.body, {
        where: {
          id: activityProgramExist.id,
        },
      });

      if (!updateActivityProgram)
        throw apiResponse(status.FORBIDDEN, "Update activity program failed");

      return Promise.resolve(
        apiResponse(status.OK, "Update activity program success")
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

  async deleteActivityProgramService(req: Request): Promise<any> {
    try {
      const activityProgramExist = await db.activityProgram.findOne({
        where: { id: req.params.id },
      });

      if (!activityProgramExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Activity program do not exist for the given id"
        );

      await db.activityProgram.destroy({
        where: { id: activityProgramExist.id },
      });

      return Promise.resolve(
        apiResponse(status.OK, "Delete activity progam success")
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
