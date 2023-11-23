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
          `Aktivitas program ${req.body.activity} sudah ada`
        );

      const createActivityProgram = await db.activityProgram.create(req.body);

      if (!createActivityProgram)
        throw apiResponse(
          status.FORBIDDEN,
          "Gagal membuat aktivitas program baru"
        );

      return Promise.resolve(
        apiResponse(status.OK, "Aktivitas program berhasil dibuat")
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

      const totalRows = await db.activityProgram.count();

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

      const activityProgram = await db.activityProgram.findAll(
        paramQuerySQL
      );

      if (!activityProgram || activityProgram.length === 0)
        throw apiResponse(status.NOT_FOUND, "Aktivitas program tidak ditemukan");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan aktivitas program", 
          activityProgram,
          totalRows
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
          "Aktivitas program dengan id tersebut tidak ditemukan"
        );

      const updateActivityProgram = await db.activityProgram.update(req.body, {
        where: {
          id: activityProgramExist.id,
        },
      });

      if (!updateActivityProgram)
        throw apiResponse(status.FORBIDDEN, "Update aktivitas program gagal");

      return Promise.resolve(
        apiResponse(status.OK, "Update aktivitas program sukses")
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
          "Aktivitas program dengan id tersebut tidak ditemukan"
        );

      await db.activityProgram.destroy({
        where: { id: activityProgramExist.id },
      });

      return Promise.resolve(
        apiResponse(status.OK, "Delete aktivitas program sukses")
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
