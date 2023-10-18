import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { verifyToken } from "../libs/jwt.lib";
import { exportExcel } from "../libs/excel.lib";
import { ISession } from "../interfaces/user.interface";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class AttendanceService {
  async createAttendanceService(req: Request): Promise<any> {
    try {
      const ekskuls = (req.session as ISession).user.ekskul;
      const selectedEkskulId = Number(req.query.ekskul_id);
      console.log(ekskuls);

      if (ekskuls.includes(selectedEkskulId)) {
        const createAttendancePromises = [];

        for (const attendance of req.body) {
          const studentId = attendance.student_id;

          const studentOnEkskul = await db.studentOnEkskul.findOne({
            where: { student_id: studentId, ekskul_id: selectedEkskulId },
          });

          if (studentOnEkskul) {
            const createAttendance = db.attendance.create({
              ...attendance,
              ekskul_id: selectedEkskulId,
            });
            createAttendancePromises.push(createAttendance);
          } else {
            throw apiResponse(
              status.FORBIDDEN,
              `Student with ID ${studentId} is not associated with the selected ekskul`
            );
          }
        }

        const createdAttendances = await Promise.all(createAttendancePromises);

        if (!createdAttendances.length) {
          throw apiResponse(status.FORBIDDEN, "Create new attendances failed");
        }

        return Promise.resolve(
          apiResponse(status.OK, "Create new attendance success")
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
  async fetchAttendanceService(req: Request): Promise<any> {
    try {
      // const attendanceData = await db.attendance.findAll();
      const attendanceData = [{
        "siswa_id":1,
        "category":"hadir",
        "date":"2021-10-01"
      }]
      console.log(attendanceData);
      

      if (!attendanceData)
        throw apiResponse(status.FORBIDDEN, "attendance data not found");

      return Promise.resolve(
        apiResponse(status.OK, "Create new attendance success", attendanceData)
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
  async exportAttendance(req: Request): Promise<any> {
    try {
      // const attendanceData = await db.attendance.findAll();
      const attendanceData = [{
        "siswa_id":1,
        "category":"hadir",
        "date":"2021-10-01"
      }]

      const columns = [
        { header: 'Student', key: 'siswa_id', width: 15 },
        { header: 'Category', key: 'category', width: 15 },
        { header: 'Date', key: 'date', width: 15 },
      ];
      const file = 'ajdoad.xlsx'; // Use 'filename' here

      const exportSuccess = await exportExcel(columns, attendanceData, file);      


      if (!exportSuccess)
        throw apiResponse(status.FORBIDDEN, "Export failed");

      return Promise.resolve(
        apiResponse(status.OK, "Export Success")
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


  async getAllAttendanceService(req: Request): Promise<any> {
    try {
      const ekskuls = (req.session as ISession).user.ekskul;
      const selectedEkskulId = req.query.ekskul_id;

      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const page: any = req.query.page;

      if (ekskuls.includes(Number(selectedEkskulId))) {
        const paramQuerySQL: any = {
          where: { ekskul_id: selectedEkskulId },
        };
        let limit: number;
        let offset: number;

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

        paramQuerySQL.include = [
          {
            model: db.ekskul,
            attributes: ["name"],
            as: "ekskul",
          },
          {
            model: db.student,
            attributes: ["name"],
            as: "student",
          },
        ];

        const attendances = await db.attendance.findAll(paramQuerySQL);

        if (!attendances || attendances.length === 0) {
          return Promise.resolve(
            apiResponse(
              status.NOT_FOUND,
              "No attendances found with the specified filter"
            )
          );
        }

        const modifiedAttendances = attendances.map((attendance) => {
          return {
            id: attendance.id,
            ekskul_id: attendance.ekskul.name,
            student_id: attendance.student.name,
            category: attendance.category,
            date: attendance.date,
            createdAt: attendance.createdAt,
            updatedAt: attendance.updatedAt,
          };
        });

        return Promise.resolve(
          apiResponse(
            status.OK,
            "Fetched all attendances success",
            modifiedAttendances
          )
        );
      } else {
        throw apiResponse(
          status.NOT_FOUND,
          "Ekskul do not exist for the given id"
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

  async updateAttendanceService(req: Request): Promise<any> {
    try {
      const attendanceExist = await db.attendance.findOne({
        where: { id: req.params.id },
      });

      if (!attendanceExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Attendance do not exist for the given id"
        );

      const updateAttendance = await db.attendance.update(req.body, {
        where: {
          id: attendanceExist.id,
        },
      });

      if (!updateAttendance)
        throw apiResponse(status.FORBIDDEN, "Update attendance failed");

      return Promise.resolve(
        apiResponse(status.OK, "Update attendance success")
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
