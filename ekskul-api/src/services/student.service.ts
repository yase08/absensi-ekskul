import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler
const db = require("../db/models/index.js");

export class StudentService {
  async createStudentService(req: Request): Promise<any> {
    try {
      const student = await db.student.findOne({
        where: { name: req.body.name },
      });

      if (student)
        throw apiResponse(
          status.CONFLICT,
          `Siswa dengan nama ${req.body.name} sudah ada`
        );

      const ekskuls = await db.ekskul.findAll({
        where: { id: req.body.ekskuls },
      });

      const createStudent = await db.student.create(req.body);

      Promise.all(
        ekskuls.map(async (ekskul) => {
          try {
            const createStudentEkskuls = await db.studentOnEkskul.create({
              student_id: createStudent.id,
              ekskul_id: ekskul.id,
            });
            return createStudentEkskuls;
          } catch (error) {
            console.error(error);
          }
        })
      );

      if (!createStudent)
        throw apiResponse(status.FORBIDDEN, "Gagal membuat siswa");

      return Promise.resolve(apiResponse(status.OK, "Berhasil membuat siswa"));
    } catch (error: any) {
      console.log(error);
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async getAllStudentService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {
        attributes: ["id", "name", "nis", "email", "mobileNumber", "gender"],
        include: [
          {
            model: db.rombel,
            attributes: ["id", "name"],
            as: "rombel",
          },
          {
            model: db.rayon,
            attributes: ["id", "name"],
            as: "rayon",
          },
          {
            model: db.ekskul,
            attributes: ["id", "name"],
          },
        ],
      };
      let limit: number;
      let offset: number;

      const totalRows = await db.student.count();

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

      const student = await db.student.findAll(paramQuerySQL);

      if (!student || student.length === 0)
        throw apiResponse(status.NOT_FOUND, "Siswa tidak ditemukan");

      const manipulatedStudent = student.map((student: any) => {
        return {
          id: student.id,
          name: student.name,
          nis: student.nis,
          email: student.email,
          mobileNumber: student.mobileNumber,
          gender: student.gender,
          rombel: student.rombel
            ? {
                id: student.rombel.id,
                name: student.rombel.name,
              }
            : null,
          rayon: student.rayon
            ? {
                id: student.rayon.id,
                name: student.rayon.name,
              }
            : null,
          ekskuls: student.ekskuls
            ? student.ekskuls.map((ekskul) => {
                return {
                  id: ekskul.id,
                  name: ekskul.name,
                };
              })
            : null,
        };
      });

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan siswa",
          manipulatedStudent,
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
  async getStudentOnAssessmentService(req: Request): Promise<any> {
    try {
      const ekskul_id = req.query.ekskul_id as string;
      const task_id = req.query.task_id as string;

      const assessmentSubquery = `(SELECT student_id FROM assessments WHERE task_id = '${task_id}')`;

      const paramQuerySQL: any = {
        attributes: ["id", "name"],
        include: [
          {
            model: db.ekskul,
            attributes: [],
            where: { id: ekskul_id },
          },
        ],
        where: {
          id: {
            [db.Sequelize.Op.notIn]: db.Sequelize.literal(assessmentSubquery),
          },
        },
      };

      const studentsWithoutAssessment = await db.student.findAll({
        ...paramQuerySQL,
      });

      const manipulatedStudent = studentsWithoutAssessment.map(
        (student: any) => ({
          id: student.id,
          name: student.name,
        })
      );

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan siswa berdasarkan ekskul",
          manipulatedStudent
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

  async getStudentByEkskulService(req: Request): Promise<any> {
    try {
      const ekskul_id = req.query.ekskul_id as string;

      const paramQuerySQL: any = {
        attributes: ["id", "name"],
        include: [
          {
            model: db.ekskul,
            attributes: [],
            where: { id: ekskul_id },
          },
        ],
      };

      const student = await db.student.findAll(paramQuerySQL);

      if (!student || student.length === 0) {
        throw apiResponse(status.NOT_FOUND, "Siswa tidak ditemukan");
      }

      const manipulatedStudent = student.map((student: any) => {
        return {
          id: student.id,
          name: student.name,
        };
      });

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan siswa berdasarkan ekskul",
          manipulatedStudent
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

  async updateStudentService(req: Request): Promise<any> {
    try {
      const studentExist = await db.student.findOne({
        where: { id: req.params.id },
      });

      if (!studentExist)
        throw apiResponse(status.NOT_FOUND, "Siswa tidak ditemukan");

      const updateStudent = await db.student.update(req.body, {
        where: {
          id: studentExist.id,
        },
      });

      if (!updateStudent)
        throw apiResponse(status.FORBIDDEN, "Update siswa gagal");

      return Promise.resolve(apiResponse(status.OK, "Update siswa berhasil"));
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

  async deleteStudentService(req: Request): Promise<any> {
    try {
      const studentExist = await db.student.findOne({
        where: { id: req.params.id },
      });

      if (!studentExist)
        throw apiResponse(status.NOT_FOUND, "Siswa tidak ditemukan");

      await db.studentOnEkskul.destroy({
        where: { student_id: studentExist.id },
      });

      const deleteStudent = await db.student.destroy({
        where: { id: studentExist.id },
      });

      if (!deleteStudent)
        throw apiResponse(status.FORBIDDEN, "Gagal menghapus siswa");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil menghapus siswa")
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
