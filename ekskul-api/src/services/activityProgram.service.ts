import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { ISession } from "../interfaces/user.interface";
import { exportExcel } from "../libs/excel.lib";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class ActivityProgramService {
  async createActivityProgramService(req: Request): Promise<any> {
    try {
      const instructor_Id = (req.session as ISession).user.id;
      const activityProgram = await db.activityProgram.findOne({
        where: { activity: req.body.activity },
      });

      if (activityProgram)
        throw apiResponse(
          status.CONFLICT,
          `Aktivitas program ${req.body.activity} sudah ada`
        );

      const createActivityProgram = await db.activityProgram.create({
        ...req.body,
        author: instructor_Id,
      });

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

  async getAllActivityProgramByAuthorService(req: Request): Promise<any> {
    try {
      const activityProgram = await db.activityProgram.findAll({
        where: { author: req.body.author_id },
      });

      if (!activityProgram || activityProgram.length === 0)
        throw apiResponse(
          status.NOT_FOUND,
          "Aktivitas program tidak ditemukan"
        );

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan aktivitas program berdasarkan author",
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

  async getAllActivityProgramService(req: Request): Promise<any> {
    try {
      const user = (req.session as ISession).user;
      const paramQuerySQL: any = {};

      paramQuerySQL.include = [
        {
          model: db.user,
          as: "user",
          attributes: ["id", "name"],
        },
      ];

      if (user.role === "instructor") {
        paramQuerySQL.where = {
          author: user.id,
        };
      } else if (user.role === "admin") {
        paramQuerySQL.where = {};
      }

      const activityProgram = await db.activityProgram.findAll(paramQuerySQL);

      if (!activityProgram || activityProgram.length === 0)
        throw apiResponse(
          status.NOT_FOUND,
          "Aktivitas program tidak ditemukan"
        );

      const modifiedProgram = activityProgram.map((activity) => ({
        id: activity.id,
        user: activity.user
          ? {
              id: activity.user.id,
              name: activity.user.name,
            }
          : null,
        activity: activity.activity,
        task: activity.task,
        startDate: activity.startDate,
        endDate: activity.endDate,
      }));

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan aktivitas program",
          modifiedProgram
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

  async exportActivityService(req: Request, res: Response): Promise<any> {
    try {
      const date = Date.now();
      const options = { timeZone: "Asia/Jakarta" };
      const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = dateTimeFormat.format(date);
      const userId = (req.session as ISession).user.id;

      const activities = await db.activityProgram.findAll({
        where: {
          author: userId,
        },
        include: [
          {
            model: db.user,
            as: "user",
            attributes: ["name"],
          },
        ],
        attributes: ["activity", "task", "startDate", "endDate"],
      });

      const modifiedActivities = activities.map((activity) => {
        return {
          no: activities.indexOf(activity) + 1,
          activity: activity.activity ? activity.activity : null,
          task: activity.task ? activity.task : null,
          author: activity.user ? activity.user.name : null,
          startDate: activity.startDate ? activity.startDate : null,
          endDate: activity.endDate ? activity.endDate : null,
        };
      });

      const columns = [
        { header: "No", key: "no", width: 15 },
        { header: "Aktivitas", key: "activity", width: 15 },
        { header: "Tugas", key: "task", width: 15 },
        { header: "Pembuat", key: "author", width: 15 },
        { header: "Tanggal awal", key: "startDate", width: 15 },
        { header: "Tanggal akhir", key: "endDate", width: 15 },
      ];
      const file = `data-absensi-instruktur-${formattedDate}.xlsx`;

      const exportSuccess = await exportExcel(
        file,
        columns,
        modifiedActivities,
        "Aktivitas Program",
        res
      );

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", `attachment; filename=${file}`);

      if (!exportSuccess) {
        throw apiResponse(status.FORBIDDEN, "Export failed");
      }
      return Promise.resolve(
        apiResponse(status.OK, "Export Success", exportSuccess)
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

  async exportActivityAllService(req: Request, res: Response): Promise<any> {
    try {
      const date = Date.now();
      const options = { timeZone: "Asia/Jakarta" };
      const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = dateTimeFormat.format(date);

      const activities = await db.activityProgram.findAll({
        include: [
          {
            model: db.user,
            as: "user",
            attributes: ["name"],
          },
        ],
        attributes: ["activity", "task", "startDate", "endDate"],
      });

      const modifiedActivities = activities.map((activity) => {
        return {
          no: activities.indexOf(activity) + 1,
          activity: activity.activity ? activity.activity : null,
          task: activity.task ? activity.task : null,
          author: activity.user ? activity.user.name : null,
          startDate: activity.startDate ? activity.startDate : null,
          endDate: activity.endDate ? activity.endDate : null,
        };
      });

      const columns = [
        { header: "No", key: "no", width: 15 },
        { header: "Aktivitas", key: "activity", width: 15 },
        { header: "Tugas", key: "task", width: 15 },
        { header: "Pembuat", key: "author", width: 15 },
        { header: "Tanggal awal", key: "startDate", width: 15 },
        { header: "Tanggal akhir", key: "endDate", width: 15 },
      ];
      const file = `data-absensi-instruktur-${formattedDate}.xlsx`;

      const exportSuccess = await exportExcel(
        file,
        columns,
        modifiedActivities,
        "Aktivitas Program",
        res
      );

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", `attachment; filename=${file}`);

      if (!exportSuccess) {
        throw apiResponse(status.FORBIDDEN, "Export failed");
      }
      return Promise.resolve(
        apiResponse(status.OK, "Export Success", exportSuccess)
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
