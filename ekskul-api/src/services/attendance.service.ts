import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

// Berfungsi untuk menghandle logic dari controler

const prisma = new PrismaClient();

export class AttendanceService {
  async createAttendanceService(req: Request): Promise<any> {
    try {
      const attendanceData = req.body;
      // const date = new Date();

      const createAttendancePromises = attendanceData.map(
        async (attendance: any) => {
          await prisma.attendance.create({
            data: { ...attendance },
          });
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
