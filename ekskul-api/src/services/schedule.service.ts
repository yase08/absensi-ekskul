import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class ScheduleService {
  async createScheduleService(req: Request): Promise<any> {
    try {
      const createSchedule = await db.schedule.create(req.body);

      if (!createSchedule)
        throw apiResponse(status.FORBIDDEN, "Gagal membuat jadwal");

      return Promise.resolve(apiResponse(status.OK, "Berhasil membuat jadwal"));
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

  async getAllScheduleService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {};
      let limit: number;
      let offset: number;

      const totalRows = await db.schedule.count();

      paramQuerySQL.include = {
        model: db.activity,
        include: [
          { model: db.rombel, as: "rombel", attributes: ["name"] },
          { model: db.room, as: "room", attributes: ["name"] },
          { model: db.ekskul, as: "ekskul", attributes: ["name"] },
        ],
        attributes: { exclude: ["rombel_id", "room_id", "ekskul_id"] },
      };

      if (filter) {
        paramQuerySQL.where = {
          day: {
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

      const schedule = await db.schedule.findAll(paramQuerySQL);

      const modifiedSchedules = schedule.map((schedule) => {
        return {
          id: schedule.id,
          day: schedule.day,
          createdAt: schedule.createdAt,
          updatedAt: schedule.updatedAt,
          activities: schedule.activities.map((activity) => {
            return {
              id: activity.id,
              rombel: activity.rombel ? activity.rombel.name : null,
              room: activity.room ? activity.room.name : null,
              ekskul: activity.ekskul ? activity.ekskul.name : null,
              createdAt: activity.createdAt,
              updatedAt: activity.updatedAt,
            };
          }),
        };
      });

      if (!schedule || schedule.length === 0)
        throw apiResponse(status.NOT_FOUND, "Jadwal tidak ditemukan");

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan jadwal",
          modifiedSchedules,
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

  async getScheduleService(req: Request): Promise<any> {
    try {
      const schedules = await db.schedule.findAll({
        include: {
          model: db.activity,
          include: [
            { model: db.rombel, as: "rombel", attributes: ["name"] },
            { model: db.room, as: "room", attributes: ["name"] },
            { model: db.ekskul, as: "ekskul", attributes: ["name"] },
          ],
          attributes: { exclude: ["rombel_id", "room_id", "ekskul_id"] },
        },
      });

      if (!schedules)
        throw apiResponse(status.NOT_FOUND, "Schedule do not exist");

      const modifiedSchedules = schedules.map((schedule) => {
        return {
          id: schedule.id,
          day: schedule.day,
          createdAt: schedule.createdAt,
          updatedAt: schedule.updatedAt,
          activities: schedule.activities.map((activity) => {
            return {
              id: activity.id,
              rombel: activity.rombel ? activity.rombel.name : null,
              room: activity.room ? activity.room.name : null,
              ekskul: activity.ekskul ? activity.ekskul.name : null,
              createdAt: activity.createdAt,
              updatedAt: activity.updatedAt,
            };
          }),
        };
      });

      return Promise.resolve(
        apiResponse(status.OK, "Fetched schedule data", modifiedSchedules)
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
