import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";
import { ISession } from "../interfaces/user.interface";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class InstructorAttendanceService {
  async createInstructorAttendanceService(req: Request): Promise<any> {
    try {
      const instructor_Id = (req.session as ISession).user.id;
      const ekskulIds = (req.session as ISession).user.ekskul;

      const selectedEkskulId = req.query.ekskul_id as string;

      if (ekskulIds.includes(selectedEkskulId)) {
        const userOnEkskul = await db.userOnEkskul.findOne({
          where: { user_id: instructor_Id, ekskul_id: selectedEkskulId },
        });

        if (userOnEkskul) {
          const createInstructorAttendance = db.instructorAttendance.create({
            ...req.body,
            ekskul_id: selectedEkskulId,
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

      const totalRows = await db.instructorAttendance.count();

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
            ? item.user.map((user: any) => {
                return {
                  id: user.id,
                  name: user.name,
                };
              })
            : null,
          ekskul: item.ekskul
            ? item.ekskul.map((ekskul: any) => {
                return {
                  id: ekskul.id,
                  name: ekskul.name,
                };
              })
            : null,
          created_at: item.created_at,
          updated_at: item.updated_at,
        };
      });

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
}
