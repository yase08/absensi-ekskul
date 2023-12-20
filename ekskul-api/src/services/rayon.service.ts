import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class RayonService {
  async createRayonService(req: Request): Promise<any> {
    try {
      const rayon = await db.rayon.findOne({ where: { name: req.body.name } });

      if (rayon)
        throw apiResponse(
          status.CONFLICT,
          `Rayon dengan nama ${req.body.name} sudah ada`
        );

      const createRayon = await db.rayon.create(req.body);

      if (!createRayon)
        throw apiResponse(status.FORBIDDEN, "Gagal membuat rayon");

      return Promise.resolve(apiResponse(status.OK, "Rayon berhasil dibuat"));
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

  async getAllRayonService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {};
      let limit: number;
      let offset: number;

      const totalRows = await db.rayon.count();

      if (filter) {
        paramQuerySQL.where = {
          name: {
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

      const rayon = await db.rayon.findAll(paramQuerySQL);

      if (!rayon || rayon.length === 0)
        throw apiResponse(status.NOT_FOUND, "Rayon tidak ditemukan");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan rayon", rayon, totalRows)
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

  async updateRayonService(req: Request): Promise<any> {
    try {
      const rayonExist = await db.rayon.findOne({
        where: { id: req.params.id },
      });

      if (!rayonExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Rayon dengan id tersebut tidak ditemukan"
        );

      const rayonSame = await db.rayon.findOne({
        where: { name: req.body.name },
      });

      if (rayonSame && rayonSame.id !== rayonExist.id) {
        throw apiResponse(
          status.CONFLICT,
          `Rayon dengan nama ${req.body.name} sudah ada`
        );
      }

      const updateRayon = await db.rayon.update(req.body, {
        where: {
          id: rayonExist.id,
        },
      });

      if (!updateRayon)
        throw apiResponse(status.FORBIDDEN, "Update rayon gagal");

      return Promise.resolve(apiResponse(status.OK, "Update rayon berhasil"));
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

  async deleteRayonService(req: Request): Promise<any> {
    try {
      const rayonExist = await db.rayon.findOne({
        where: { id: req.params.id },
      });

      if (!rayonExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Rayon dengan id tersebut tidak ditemukan"
        );

        const studentByRayonId = await db.student.findAll({
          where: { rayon_id: rayonExist.id },
          attributes: ["id", "name"],
        });

        const deleteStudentAssessment = await db.assessment.destroy({
          where: {
            student_id: {
              [Op.in]: studentByRayonId.map((student: any) => student.id),
            },
          },
        });
  
        const deleteStudentAttendances = await db.attendance.destroy({
          where: {
            student_id: {
              [Op.in]: studentByRayonId.map((student: any) => student.id),
            },
          },
        });
  
        const deleteStudentOnEkskul = await db.studentOnEkskul.destroy({
          where: {
            student_id: {
              [Op.in]: studentByRayonId.map((student: any) => student.id),
            },
          },
        });

      const deleteStudent = await db.student.destroy({
        where: { rayon_id: rayonExist.id },
      });

      const deleteRayon = await db.rayon.destroy({
        where: { id: rayonExist.id },
      });

      if (!deleteRayon)
        throw apiResponse(status.FORBIDDEN, "Gagal menghapus rayon");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil menghapus rayon")
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
