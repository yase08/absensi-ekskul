import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class ScheduleService {
  async getScheduleService(req: Request): Promise<any> {
    try {
      const activities = await db.activity.findAll({
        include: [
          { model: db.room, as: "room", attributes: ["name"] },
          { model: db.ekskul, as: "ekskul", attributes: ["name", "category"] },
        ],
      });

      if (!activities || activities.length === 0)
        throw apiResponse(status.NOT_FOUND, "Jadwal tidak ditemukan");

      const scheduleByDay: { [key: string]: any[] } = {
        SENIN: [],
        SELASA: [],
        RABU: [],
        KAMIS: [],
        JUMAT: [],
        SABTU: [],
        MINGGU: [],
      };

      activities.forEach((activity) => {
        scheduleByDay[activity.day].push({
          id: activity.id,
          grade: activity.grade,
          category: activity.ekskul ? activity.ekskul.category : null,
          room: activity.room ? activity.room.name : null,
          ekskul: activity.ekskul ? activity.ekskul.name : null,
          startTime: activity.startTime,
          endTime: activity.endTime,
          createdAt: activity.createdAt,
          updatedAt: activity.updatedAt,
        });
      });

      const modifiedActivities = Object.keys(scheduleByDay).map((day) => ({
        day,
        activities: scheduleByDay[day],
      }));

      return Promise.resolve(
        apiResponse(status.OK, "Fetched schedule data", modifiedActivities)
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
