import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { exportExcel } from "../libs/excel.lib";
import { ISession } from "../interfaces/user.interface";

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
        apiResponse(status.OK, "Berhasil mendapatkan siswa", manipulatedStudent)
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

      const ekskuls = await db.ekskul.findAll({
        where: { id: req.body.ekskuls },
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

      Promise.all(
        ekskuls.map(async (ekskul) => {
          try {
            const updateStudentEkskuls = await db.studentOnEkskul.update({
              student_id: updateStudent.id,
              ekskul_id: ekskul.id,
            });
            return updateStudentEkskuls;
          } catch (error) {
            console.error(error);
          }
        })
      );

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

  async exportAllStudentService(req: Request, res: Response): Promise<any> {
    try {
      const date = Date.now();
      const options = { timeZone: "Asia/Jakarta" };
      const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
      const students = await db.student.findAll({
        include: [
          {
            model: db.rombel,
            as: "rombel",
            attributes: ["name"],
          },
          {
            model: db.rayon,
            as: "rayon",
            attributes: ["name"],
          },
          {
            model: db.ekskul,
            attributes: ["id", "name"],
          },
        ],
        attributes: ["name", "nis", "gender"],
      });

      const modifiedStudents = students.map((student, index) => {
        return {
          no: index + 1,
          student_name: student ? student.name : null,
          student_nis: student ? student.nis : null,
          student_gender: student
            ? student.gender === "male"
              ? "Laki-laki"
              : "Perempuan"
            : null,
          student_rombel: student ? student.rombel.name : null,
          student_rayon: student ? student.rayon.name : null,
          student_ekskul: student.ekskuls.length > 0
            ? student.ekskuls.map((ekskul) => ekskul.name).join(', ')
            : "-",
        };
      });

      const columns = [
        { header: "No", key: "no", width: 15 },
        { header: "Nama", key: "student_name", width: 15 },
        { header: "Nis", key: "student_nis", width: 15 },
        { header: "JK", key: "student_gender", width: 15 },
        { header: "Rombel", key: "student_rombel", width: 15 },
        { header: "Rayon", key: "student_rayon", width: 15 },
        { header: "Ekstrakurikuler", key: "student_ekskul", width: 15 },
      ];
      const file = `data-siswa-${date}.xlsx`;

      const exportSuccess = await exportExcel(
        file,
        columns,
        modifiedStudents,
        "Siswa",
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
        apiResponse(status.OK, "Export Success", exportExcel)
      );
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

  async exportStudentService(req: Request, res: Response): Promise<any> {
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
        const students = await db.student.findAll({
          include: [
            {
              model: db.rombel,
              as: "rombel",
              attributes: ["name"],
            },
            {
              model: db.rayon,
              as: "rayon",
              attributes: ["name"],
            },
            {
              model: db.ekskul,
              through: "studentOnEkskuls",
              where: {
                id: selectedEkskulId,
              },
              attributes: ["name"],
            },
          ],
          attributes: ["name", "nis", "gender"],
        });

        const modifiedStudents = students.map((student) => {
          return {
            no: students.indexOf(student) + 1,
            student_name: student ? student.name : null,
            student_nis: student ? student.nis : null,
            student_gender: student
              ? student.gender === "male"
                ? "Laki-laki"
                : "Perempuan"
              : null,
            student_rombel: student ? student.rombel.name : null,
            student_rayon: student ? student.rayon.name : null,
            student_ekskul: student.ekskuls.length > 0
            ? student.ekskuls.map((ekskul) => ekskul.name).join(', ')
            : "-"};
        });

        const columns = [
          { header: "No", key: "no", width: 15 },
          { header: "Nama", key: "student_name", width: 15 },
          { header: "Nis", key: "student_nis", width: 15 },
          { header: "JK", key: "student_gender", width: 15 },
          { header: "Rombel", key: "student_rombel", width: 15 },
          { header: "Rayon", key: "student_rayon", width: 15 },
          { header: "Ekstrakurikuler", key: "student_ekskul", width: 15 },
        ];
        const file = `data-siswa-${date}.xlsx`;

        const exportSuccess = await exportExcel(
          file,
          columns,
          modifiedStudents,
          "Siswa",
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
}
