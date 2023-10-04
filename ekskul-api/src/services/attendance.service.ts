import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";

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
}
