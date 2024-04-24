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
      const paramQuerySQL: any = {};

      paramQuerySQL.include = {
        model: db.activity,
        include: [
          { model: db.room, as: "room", attributes: ["name"] },
          { model: db.ekskul, as: "ekskul", attributes: ["name"] },
        ],
        attributes: { exclude: ["ekskul_id", "grade"] },
      };

      const schedule = await db.schedule.findAll(paramQuerySQL);

      if (!schedule || schedule.length === 0)
        throw apiResponse(status.NOT_FOUND, "Jadwal tidak ditemukan");

      const modifiedSchedules = schedule.map((schedule) => {
        return {
          id: schedule.id,
          day: schedule.day,
          createdAt: schedule.createdAt,
          updatedAt: schedule.updatedAt,
          activities: schedule.activities.map((activity) => {
            return {
              id: activity.id,
              grade: activity.grade,
              room: activity.room ? activity.room.name : null,
              ekskul: activity.ekskul ? activity.ekskul.name : null,
              createdAt: activity.createdAt,
              updatedAt: activity.updatedAt,
            };
          }),
        };
      });

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan jadwal", modifiedSchedules)
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

  async getAllDayService(req: Request): Promise<any> {
    try {
      const schedule = await db.schedule.findAll({
        attributes: ["id", "day"],
      });

      if (!schedule || schedule.length === 0)
        throw apiResponse(status.NOT_FOUND, "Jadwal tidak ditemukan");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan hari", schedule)
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
            {
              model: db.ekskul,
              as: "ekskul",
              attributes: ["name", "category"],
            },
            { model: db.room, as: "room", attributes: ["name"] },
          ],
          attributes: ["grade", "startTime", "endTime"],
        },
      });

      if (!schedules || schedules.length === 0)
        throw apiResponse(status.NOT_FOUND, "Jadwal tidak ditemukan");

      const modifiedSchedules = schedules.map((schedule) => {
        return {
          id: schedule.id,
          day: schedule.day,
          createdAt: schedule.createdAt,
          updatedAt: schedule.updatedAt,
          activities: schedule.activities.map((activity) => {
            return {
              id: activity.id,
              grade: activity.grade,
              room: activity.room.name,
              ekskul: activity.ekskul.name,
              category: activity.ekskul.category,
              startTime: activity.startTime,
              endTime: activity.endTime,
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

  async updateScheduleService(req: Request): Promise<any> {
    try {
      const scheduleExist = await db.schedule.findOne({
        where: { id: req.params.id },
      });

      if (!scheduleExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Hari dengan id tersebut tidak ditemukan"
        );

      const scheduleSame = await db.schedule.findOne({
        where: { name: req.body.name },
      });

      if (scheduleSame && scheduleSame.id !== scheduleExist.id) {
        throw apiResponse(
          status.CONFLICT,
          `Hari dengan nama ${req.body.name} sudah ada`
        );
      }

      const updateSchedule = await db.schedule.update(req.body, {
        where: {
          id: scheduleExist.id,
        },
      });

      if (!updateSchedule)
        throw apiResponse(status.FORBIDDEN, "Update hari gagal");

      return Promise.resolve(apiResponse(status.OK, "Update hari berhasil"));
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
