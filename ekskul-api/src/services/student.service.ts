import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";

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
          `Student ${req.body.name} already exist`
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
        throw apiResponse(status.FORBIDDEN, "Create new student failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new student success")
      );
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
        attributes: ["id", "name", "nis", "email", "mobileNumber"],
        include: [
          {
            model: db.rombel,
            attributes: ["name"],
            as: "rombel",
          },
          {
            model: db.rayon,
            attributes: ["name"],
            as: "rayon",
          },
          {
            model: db.ekskul,
            attributes: ["name"],
            through: {
              attributes: [],
            },
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

      if (!student)
        throw apiResponse(status.NOT_FOUND, "Students do not exist");

      const manipulatedStudent = student.map((student: any) => {
        return {
          id: student.id,
          name: student.name,
          nis: student.nis,
          email: student.email,
          mobileNumber: student.mobileNumber,
          rombel: student.rombel ? student.rombel.name : null,
          rayon: student.rayon ? student.rayon.name : null,
          ekskuls: student.ekskuls
            ? student.ekskuls.map((ekskul: any) => ekskul.name)
            : null,
        };
      });

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Fetched all students success",
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

  async updateStudentService(req: Request): Promise<any> {
    try {
      const studentExist = await db.student.findOne({
        where: { id: req.params.id },
      });

      if (!studentExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Student do not exist for the given id"
        );

      const updateStudent = await db.student.update(req.body, {
        where: {
          id: studentExist.id,
        },
      });

      if (!updateStudent)
        throw apiResponse(status.FORBIDDEN, "Update student failed");

      return Promise.resolve(apiResponse(status.OK, "Update student success"));
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
        throw apiResponse(
          status.NOT_FOUND,
          "Student do not exist for the given id"
        );

      await db.studentOnEkskul.destroy({
        where: { student_id: studentExist.id },
      });

      const deleteStudent = await db.student.destroy({
        where: { id: studentExist.id },
      });

      if (!deleteStudent)
        throw apiResponse(status.FORBIDDEN, "Delete student failed");

      return Promise.resolve(apiResponse(status.OK, "Delete student success"));
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

  async getStudentService(req: Request): Promise<any> {
    try {
      const student = await db.student.findOne({
        where: { id: req.params.id },
      });

      if (!student) throw apiResponse(status.NOT_FOUND, "Student do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched student success", student)
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
