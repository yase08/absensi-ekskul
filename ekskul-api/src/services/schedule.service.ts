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
          { model: db.rombel, as: "rombel", attributes: ["name"] },
          { model: db.room, as: "room", attributes: ["name"] },
          { model: db.ekskul, as: "ekskul", attributes: ["name"] },
        ],
        attributes: { exclude: ["rombel_id", "room_id", "ekskul_id"] },
      };

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
            { model: db.rombel, as: "rombel", attributes: ["id", "name"] },
            { model: db.room, as: "room", attributes: ["id", "name"] },
            { model: db.ekskul, as: "ekskul", attributes: ["id", "name"] },
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
              rombel: activity.rombel
                ? activity.rombel.map((rombel: any) => {
                    return {
                      id: rombel.id,
                      name: rombel.name,
                    };
                  })
                : null,
              room: activity.room
                ? activity.room.map((room: any) => {
                    return {
                      id: room.id,
                      name: room.name,
                    };
                  })
                : null,
              ekskul: activity.ekskul
                ? activity.ekskul.map((ekskul: any) => {
                    return {
                      id: ekskul.id,
                      name: ekskul.name,
                    };
                  })
                : null,
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
