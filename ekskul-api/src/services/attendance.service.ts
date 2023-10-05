import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class AttendanceService {
  async createAttendanceService(req: Request): Promise<any> {
    try {
      const attendanceData = req.body;

      const createAttendancePromises = attendanceData.map(
        async (attendance: any) => {
          await db.attendance.create(attendance);
        }
      );

      const createAttendances = await Promise.all(createAttendancePromises);

      if (!createAttendances)
        throw apiResponse(status.FORBIDDEN, "Create new attendances failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new attendance success")
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
          name: { [Op.iLike]: `%${filter}%` },
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
        limit = 5;
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }

      const attendances = await db.attendance.findAll(paramQuerySQL);

      if (!attendances) throw apiResponse(status.NOT_FOUND, "Attendances do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all attendances success", attendances)
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

  async updateAttendanceService(req: Request): Promise<any> {
    try {
      const attendanceExist = await db.attendance.findOne({
        where: { id: req.params.id },
      });

      if (!attendanceExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Attendances do not exist for the given member_id"
        );

      const updateAttendance = await db.attendance.update(req.body);

      if (!updateAttendance)
        throw apiResponse(status.FORBIDDEN, "Update attendance failed");

      return Promise.resolve(apiResponse(status.OK, "Update attendance success"));
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
