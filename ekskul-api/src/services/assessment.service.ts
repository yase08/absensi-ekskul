import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class AssessmentService {
  async createAssessmentService(req: Request): Promise<any> {
    try {
      const createAssessmentPromises = [];

      for (const assessment of req.body) {
        const existingAssessment = await db.assessment.findOne({
          where: {
            student_id: assessment.student_id,
            task_id: assessment.task_id,
          },
        });
        if (existingAssessment) {
          throw apiResponse(
            status.CONFLICT,
            `Penilaian untuk siswa ${assessment.student_id} dan tugas ${assessment.task_id} sudah ada`
          );
        }
        const createAssessment = await db.assessment.create({
          student_id: assessment.student_id,
          task_id: assessment.task_id,
          date: assessment.date,
          grade: assessment.grade,
        });

        console.log(createAssessment);
      }
      const createAttendances = await Promise.all(createAssessmentPromises);

      if (!createAttendances)
        throw apiResponse(status.FORBIDDEN, "Gagal membuat penilaian");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil membuat penilaian")
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

  async getAllAssessmentByTaskService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;
      const task_id = req.query.task_id as string;

      const paramQuerySQL: any = {
        where: {
          task_id: task_id,
        },
      };
      let limit: number;
      let offset: number;

      const totalRows = await db.assessment.count({
        where: {
          task_id: task_id,
        },
      });

      if (filter) {
        paramQuerySQL.where = {
          student_id: {
            [Op.like]: `%${filter}%`,
          },
        };
      }

      paramQuerySQL.attributes = ["id", "grade", "createdAt", "updatedAt"];

      paramQuerySQL.include = [
        { model: db.student, as: "student", attributes: ["id", "name"] },
        { model: db.task, as: "task", attributes: ["id", "name"] },
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
      }

      const assessment = await db.assessment.findAll(paramQuerySQL);

      if (!assessment || assessment.length === 0)
        throw apiResponse(status.NOT_FOUND, "Penilaian tidak ditemukan");

      const manipulatedResponse = assessment.map((item) => ({
        id: item.id,
        grade: item.grade,
        student: item.student
          ? {
              id: item.student.id,
              name: item.student.name,
            }
          : null,
        date: item.date,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan data penilaian",
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

  async updateAssessmentService(req: Request): Promise<any> {
    try {
      const assessmentExist = await db.assessment.findOne({
        where: { id: req.params.id },
      });

      if (!assessmentExist)
        throw apiResponse(status.NOT_FOUND, "Penilaian tidak ditemukan");

      const updateAssessment = await db.assessment.update(req.body, {
        where: {
          id: assessmentExist.id,
        },
      });

      if (!updateAssessment)
        throw apiResponse(status.FORBIDDEN, "Update penilaian gagal");

      return Promise.resolve(
        apiResponse(status.OK, "Update penilaian berhasil")
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

  async deleteAssessmentService(req: Request): Promise<any> {
    try {
      const assessmentExist = await db.assessment.findOne({
        where: { id: req.params.id },
      });

      if (!assessmentExist)
        throw apiResponse(status.NOT_FOUND, "Penilaian tidak ditemukan");

      await db.assessment.destroy({
        where: { id: assessmentExist.id },
      });

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil menghapus penilaian")
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
