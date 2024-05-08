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
      const paramQuerySQL: any = {};

      paramQuerySQL.include = [
        { model: db.room, as: "room", attributes: ["id", "name"] },
        { model: db.ekskul, as: "ekskul", attributes: ["id", "name"] },
      ];

      const activity = await db.activity.findAll(paramQuerySQL);

      if (!activity || activity.length === 0) {
        throw apiResponse(status.NOT_FOUND, "Aktivitas tidak ditemukan");
      }

      const manipulatedActivity = activity.map((activity) => {
        return {
          id: activity.id,
          startTime: activity.startTime,
          endTime: activity.endTime,
          grade: activity.grade,
          day: activity.day,
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
          createdAt: activity.createdAt,
          updatedAt: activity.updatedAt,
        };
      });

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan semua aktivitas",
          manipulatedActivity        )
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
