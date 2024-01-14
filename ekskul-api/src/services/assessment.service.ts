import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { exportExcel } from "../libs/excel.lib";
import { ISession } from "../interfaces/user.interface";

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
      const task_id = req.query.task_id as string;
      const paramQuerySQL: any = {
        where: {
          task_id: task_id,
        },
      }

      paramQuerySQL.attributes = ["id", "grade", "createdAt", "updatedAt"];

      paramQuerySQL.include = [
        { model: db.student, as: "student", attributes: ["id", "name"] },
        { model: db.task, as: "task", attributes: ["id", "name"] },
      ];

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

  async exportAssessment(req: Request, res: Response): Promise<any> {
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
        const assessments = await db.assessment.findAll({
          where: {
            ekskul_id: selectedEkskulId,
          },
          include: [
            {
              model: db.student,
              as: "student",
              attributes: ["name","nis","gender"],
              include : [
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
              ]
            },
            {
              model: db.task,
              as: "task",
              attributes: ["name"],
            },
            {
              model: db.ekskul,
              as: "ekskul",
              attributes: ["name"],
            },
            ],
          attributes: ["grade", "date"],
        });

        const modifiedassessments = assessments.map((assessment) => {
          return {
            no: assessments.indexOf(assessment) + 1,
            student_name: assessment.student ? assessment.student.name : null,
            student_nis: assessment.student ? assessment.student.nis : null,
            student_gender: assessment.student
              ? assessment.student.gender === "male"
                ? "Laki-laki"
                : "Perempuan"
              : null,
            student_rombel: assessment.student
              ? assessment.student.rombel.name
              : null,
            student_rayon: assessment.student
              ? assessment.student.rayon.name
              : null,
            ekskul_name: assessment.ekskul ? assessment.ekskul.name : null,
            task_name: assessment.task ? assessment.task.name : null,
            grade: assessment.grade ? assessment.grade : null,
            date: assessment.date ? assessment.date : null,

          };
        });

        const columns = [
          { header: "No", key: "no", width: 15 },
          { header: "Nama", key: "assessment_name", width: 15 },
          { header: "Nis", key: "assessment_nis", width: 15 },
          { header: "JK", key: "assessment_gender", width: 15 },
          { header: "Rombel", key: "assessment_rombel", width: 15 },
          { header: "Rayon", key: "assessment_rayon", width: 15 },
          { header: "Ekstrakurikuler", key: "ekskul_name", width: 15 },
          { header: "Tugas", key: "task_name", width: 15 },
          { header: "Nilai", key: "grade", width: 15 },
          { header: "Tanggal", key: "date", width: 15 },
        ];
        const file = `data-penilaian-${ekskul.name}-${date}.xlsx`;

        const exportSuccess = await exportExcel(
          columns,
          modifiedassessments,
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
}
