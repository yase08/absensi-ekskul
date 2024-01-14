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
      const paramQuerySQL: any = {};

      // paramQuerySQL.include = [
      //   {
      //     model: db.user,
      //     as: "user",
      //     attributes: ["id", "name"],
      //   },
      // ];

      const activityProgram = await db.activityProgram.findAll(paramQuerySQL);

      const modifiedProgram = activityProgram.map((activity) => {
        return {
          id: activity.id,
          activity: activity.activity,
          task: activity.task,
          author: activity.author,
          startDate: activity.startDate,
          endDate: activity.endDate,
          createdAt: activity.createdAt,
          updatedAt: activity.updatedAt,
        };
      });

      if (!activityProgram || activityProgram.length === 0)
        throw apiResponse(
          status.NOT_FOUND,
          "Aktivitas program tidak ditemukan"
        );

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan aktivitas program",
          modifiedProgram,
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

      const ekskuls = (req.session as ISession).user.ekskul;
      const selectedEkskulId = req.query.ekskul_id as string;
      const ekskul = await db.ekskul.findOne({
        where: { id: selectedEkskulId },
      });

      if (ekskuls.includes(selectedEkskulId)) {
        const attendances = await db.instructorAttendance.findAll({
          where: {
            ekskul_id: selectedEkskulId,
          },
          include: [
            {
              model: db.user,
              as: "user",
              attributes: ["name"],
            },
            {
              model: db.ekskul,
              as: "ekskul",
              attributes: ["name"],
            },
          ],
          attributes: ["category", "date"],
        });

        const modifiedAttendances = attendances.map((attendance) => {
          return {
            no: attendances.indexOf(attendance) + 1,
            user_name: attendance.user ? attendance.user.name : null,
            ekskul_name: attendance.ekskul ? attendance.ekskul.name : null,
            category: attendance.category,
            date: attendance.date,
          };
        });

        const columns = [
          { header: "No", key: "no", width: 15 },
          { header: "Nama", key: "user_name", width: 15 },
          { header: "Ekstrakurikuler", key: "ekskul_name", width: 15 },
          { header: "Keterangan", key: "category", width: 15 },
          { header: "Tanggal", key: "date", width: 15 },
        ];
        const file = `data-absensi-instruktur-${date}.xlsx`;

        const exportSuccess = await exportExcel(
          columns,
          modifiedAttendances,
          file,
          res
        );

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${file}`);

        if (!exportSuccess) {
          throw apiResponse(status.FORBIDDEN, "Export failed");
        }
        return Promise.resolve(apiResponse(status.OK, "Export Success", exportSuccess));
      } else {
        throw apiResponse(
          status.NOT_FOUND,
          "Ekskul does not exist for the given id"
        );
      }
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
            no: activity.indexOf(activity) + 1,
            activity: activity.activity ? activity.activity : null,
            task: activity.task ? activity.task : null,
            author: activity.user ? activity.user.name : null,
            startDate: activity.startDate ? activity.startDate : null ,
            endDate: activity.endDate ? activity.endDate : null ,
          };
        });

        const columns = [
          { header: "No", key: "no", width: 15 },
          { header: "Aktifitas", key: "activity", width: 15 },
          { header: "Tugas", key: "task", width: 15 },
          { header: "Pembuat", key: "author", width: 15 },
          { header: "Tanggal awal", key: "startDate", width: 15 },
          { header: "Tanggal akhir", key: "endDate", width: 15 },

        ];
        const file = `data-absensi-instruktur-${date}.xlsx`;

        const exportSuccess = await exportExcel(
          columns,
          modifiedActivities,
          file,
          res
        );

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${file}`);

        if (!exportSuccess) {
          throw apiResponse(status.FORBIDDEN, "Export failed");
        }
        return Promise.resolve(apiResponse(status.OK, "Export Success", exportSuccess));
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
