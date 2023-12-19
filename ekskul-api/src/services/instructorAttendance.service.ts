import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { ISession } from "../interfaces/user.interface";
import { exportExcel } from "../libs/excel.lib";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class InstructorAttendanceService {
  async createInstructorAttendanceService(req: Request): Promise<any> {
    try {
      const instructor_Id = (req.session as ISession).user.id;
      const ekskulIds = (req.session as ISession).user.ekskul;

      if (ekskulIds.includes(req.body.ekskul_id)) {
        const userOnEkskul = await db.userOnEkskul.findOne({
          where: { user_id: instructor_Id, ekskul_id: req.body.ekskul_id },
        });

        if (userOnEkskul) {
          const createInstructorAttendance = db.instructorAttendance.create({
            ...req.body,
            instructor_id: instructor_Id,
          });
          if (!createInstructorAttendance)
            throw apiResponse(status.FORBIDDEN, "Absensi gagal ditambahkan");

          return Promise.resolve(
            apiResponse(status.OK, "Absensi berhasil ditambahkan")
          );
        } else {
          throw apiResponse(
            status.FORBIDDEN,
            `Instruktur dengan id ${instructor_Id} tidak terdaftar di ekskul ini`
          );
        }
      } else {
        throw apiResponse(status.NOT_FOUND, "Ekskul tidak ditemukan");
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

  async getAllInstructorAttendanceService(req: Request): Promise<any> {
    const ekskulIds = (req.session as ISession).user.ekskul;
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
          name: { [Op.like]: `%${filter}%` },
        };
      }

      paramQuerySQL.include = [
        {
          model: db.user,
          as: "user",
          attributes: ["id", "name"],
        },
        {
          model: db.ekskul,
          as: "ekskul",
          attributes: ["id", "name"],
        },
      ];

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
        if (ekskulIds.length > 1) {
          paramQuerySQL.where = {
            ekskul_id: ekskulIds,
          };
        } else if (ekskulIds.length === 1) {
          paramQuerySQL.where = {
            ekskul_id: ekskulIds[0],
          };
        }
      }

      const instructorAttendance = await db.instructorAttendance.findAll(
        paramQuerySQL
      );

      if (!instructorAttendance || instructorAttendance.length === 0)
        throw apiResponse(status.NOT_FOUND, "Instruktur tidak ditemukan");

      const manipulatedResponse = instructorAttendance.map((item) => {
        return {
          id: item.id,
          category: item.category,
          user: item.user
            ? {
                id: item.user.id,
                name: item.user.name,
              }
            : null,
          ekskul: item.ekskul
            ? {
                id: item.ekskul.id,
                name: item.ekskul.name,
              }
            : null,
          date: item.date,
        };
      });

      const totalRows = instructorAttendance.length;

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan absensi instruktur",
          manipulatedResponse,
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

  async updateInstructorAttendanceService(req: Request): Promise<any> {
    try {
      const instructorExist = await db.instructorAttendance.findOne({
        where: { id: req.params.id },
      });

      if (!instructorExist)
        throw apiResponse(status.NOT_FOUND, "Instruktur tidak ditemukan");

      const updateInstructor = await db.instructorAttendance.update(req.body, {
        where: { id: instructorExist.id },
      });

      if (!updateInstructor)
        throw apiResponse(status.FORBIDDEN, "Update instruktur berhasil");

      return Promise.resolve(
        apiResponse(status.OK, "Update instruktur berhasil")
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

  async deleteInstructorAttendanceService(req: Request): Promise<any> {
    try {
      const instructorExist = await db.instructorAttendance.findOne({
        where: { id: req.params.id },
      });

      if (!instructorExist)
        throw apiResponse(status.NOT_FOUND, "Instruktur tidak ditemukan");

      const deleteInstructor = await db.instructorAttendance.destroy({
        where: { id: instructorExist.id },
      });

      if (!deleteInstructor)
        throw apiResponse(status.FORBIDDEN, "Gagal menghapus instruktur");

      return Promise.resolve(
        apiResponse(status.OK, "Gagal menghapus instruktur")
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

  async exportAttendanceService(req: Request, res: Response): Promise<any> {
    try {
      const date = Date.now();
      const options = { timeZone: "Asia/Jakarta" };
      const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = dateTimeFormat.format(date);

      // const ekskuls = (req.session as ISession).user.ekskul;
      // const selectedEkskulId = req.query.ekskul_id as string;
      // const ekskul = await db.ekskul.findOne({
      //   where: { id: selectedEkskulId },
      // });

      // if (ekskuls.includes(selectedEkskulId)) {
        const attendances = await db.instructorAttendance.findAll({
          // where: {
          //   ekskul_id: selectedEkskulId,
          // },
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
      // } else {
      //   throw apiResponse(
      //     status.NOT_FOUND,
      //     "Ekskul does not exist for the given id"
      //   );
      // }
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
