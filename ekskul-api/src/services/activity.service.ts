import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class ActivityService {
  async createActivityService(req: Request): Promise<any> {
    try {
      const createActivity = await db.activity.create(req.body);

      if (!createActivity)
        throw apiResponse(status.FORBIDDEN, "Gagal membuat aktivitas");

      return Promise.resolve(
        apiResponse(status.OK, "Aktivitas berhasil dibuat")
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

  async getAllActivityService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {};
      let limit: number;
      let offset: number;

      const totalRows = await db.activity.count();

      paramQuerySQL.include = [
        { model: db.rombel, as: "rombel", attributes: ["id", "name"] },
        { model: db.room, as: "room", attributes: ["id", "name"] },
        { model: db.ekskul, as: "ekskul", attributes: ["id", "name"] },
        { model: db.schedule, as: "schedule", attributes: ["id", "name"] },
      ];

      if (sort) {
        const sortOrder = sort.startsWith("-") ? "DESC" : "ASC";
        const fieldName = sort.replace(/^-/, "");
        paramQuerySQL.order = [[fieldName, sortOrder]];
      }

      if (page && page.size && page.number) {
        limit = parseInt(page.size);
        offset = (parseInt(page.number) - 1) * limit;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      } else {
        limit = 10;
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }

      if (filter) {
        paramQuerySQL.where = {
          schedule_id: parseInt(filter),
        };
      }

      const activity = await db.activity.findAll(paramQuerySQL);

      if (!activity || activity.length === 0) {
        throw apiResponse(status.NOT_FOUND, "Aktivitas tidak ditemukan");
      }

      const manipulatedActivity = activity.map((activity) => {
        return {
          id: activity.id,
          startTime: activity.startTime,
          endTime: activity.endTime,
          rombel: activity.rombel
            ? {
                id: activity.rombel.id,
                name: activity.rombel.name,
              }
            : null,
          room: activity.room
            ? {
                id: activity.room.id,
                name: activity.room.name,
              }
            : null,
          ekskul: activity.ekskul
            ? {
                id: activity.ekskul.id,
                name: activity.ekskul.name,
              }
            : null,
          schedule: activity.schedule
            ? {
                id: activity.schedule.id,
                name: activity.schedule.name,
              }
            : null,
          createdAt: activity.createdAt,
          updatedAt: activity.updatedAt,
        };
      });

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan semua aktivitas",
          manipulatedActivity,
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

  async updateActivityService(req: Request): Promise<any> {
    try {
      const activityExist = await db.activity.findOne({
        where: { id: req.params.id },
      });

      if (!activityExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Aktivitas dengan id tersebut tidak ditemukan"
        );

      const updateActivity = await db.activity.update(req.body, {
        where: {
          id: activityExist.id,
        },
      });

      if (!updateActivity)
        throw apiResponse(status.FORBIDDEN, "Update aktivitas gagal");

      return Promise.resolve(apiResponse(status.OK, "Update aktivitas sukses"));
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

  async deleteActivityService(req: Request): Promise<any> {
    try {
      const activityExist = await db.activity.findOne({
        where: { id: req.params.id },
      });

      if (!activityExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Aktivitas dengan id tersebut tidak ditemukan"
        );

      await db.activity.destroy({
        where: { id: activityExist.id },
      });

      return Promise.resolve(apiResponse(status.OK, "Delete aktivitas sukses"));
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
