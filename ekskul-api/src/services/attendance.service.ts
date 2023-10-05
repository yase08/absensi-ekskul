import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { exportExcel } from "../libs/excel.lib";

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

}
