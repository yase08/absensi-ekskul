import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class RombelService {
  async createRombelService(req: Request): Promise<any> {
    try {
      const rombel = await db.rombel.findOne({
        where: { name: req.body.name },
      });

      if (rombel)
        throw apiResponse(
          status.CONFLICT,
          `Rombel dengan nama ${req.body.name} sudah ada`
        );

      const createRombel = await db.rombel.create(req.body);

      if (!createRombel)
        throw apiResponse(status.FORBIDDEN, "Gagal membuat rombel");

      return Promise.resolve(apiResponse(status.OK, "Rombel berhasil dibuat"));
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

  async getAllRombelService(req: Request): Promise<any> {
    try {
      const paramQuerySQL: any = {};

      const rombel = await db.rombel.findAll(paramQuerySQL);

      if (!rombel || rombel.length === 0)
        throw apiResponse(status.NOT_FOUND, "Rombel tidak ditemukan");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan rombel", rombel)
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

  async updateRombelService(req: Request): Promise<any> {
    try {
      const rombelExist = await db.rombel.findOne({
        where: { id: req.params.id },
      });

      if (!rombelExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Rombel dengan id tersebut tidak ditemukan"
        );

      const rombelSame = await db.rombel.findOne({
        where: { name: req.body.name },
      });

      if (rombelSame && rombelSame.id !== rombelExist.id) {
        throw apiResponse(
          status.CONFLICT,
          `Rombel dengan nama ${req.body.name} sudah ada`
        );
      }

      const updateRombel = await db.rombel.update(req.body, {
        where: {
          id: rombelExist.id,
        },
      });

      if (!updateRombel)
        throw apiResponse(status.FORBIDDEN, "Update rombel gagal");

      return Promise.resolve(apiResponse(status.OK, "Update rombel berhasil"));
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

  async deleteRombelService(req: Request): Promise<any> {
    try {
      const rombelExist = await db.rombel.findOne({
        where: { id: req.params.id },
      });

      if (!rombelExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Rombel dengan id tersebut tidak ditemukan"
        );

      const studentByRombelId = await db.student.findAll({
        where: { rombel_id: rombelExist.id },
        attributes: ["id", "name"],
      });

      const deleteStudentAssessment = await db.assessment.destroy({
        where: {
          student_id: {
            [Op.in]: studentByRombelId.map((student: any) => student.id),
          },
        },
      });

      const deleteStudentAttendances = await db.attendance.destroy({
        where: {
          student_id: {
            [Op.in]: studentByRombelId.map((student: any) => student.id),
          },
        },
      });

      const deleteStudentOnEkskul = await db.studentOnEkskul.destroy({
        where: {
          student_id: {
            [Op.in]: studentByRombelId.map((student: any) => student.id),
          },
        },
      });

      const deleteStudent = await db.student.destroy({
        where: {
          rombel_id: rombelExist.id,
        },
      });

      const deleteRombel = await db.rombel.destroy({
        where: { id: rombelExist.id },
      });

      if (!deleteRombel)
        throw apiResponse(status.FORBIDDEN, "Gagal menghapus rombel");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil menghapus rombel")
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
