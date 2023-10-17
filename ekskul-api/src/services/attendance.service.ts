import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../libs/jwt.lib";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class AttendanceService {
  async createAttendanceService(req: Request): Promise<any> {
    try {
      const accessToken: string = (req.headers.authorization as string).split(
        "Bearer "
      )[1];
      const decodedToken: string | JwtPayload = await verifyToken(accessToken);

      const ekskul = await db.ekskul.findOne({
        where: { id: decodedToken["ekskul"] },
      });

      const attendanceData = req.body;

      const createAttendancePromises = attendanceData.map(
        async (attendance: any) => {
          await db.attendance.create({ ...attendance, ekskul_id: ekskul.id });
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

  async getAllAttendanceService(req: Request): Promise<any> {
    try {
      const accessToken: string = (req.headers.authorization as string).split(
        "Bearer "
      )[1];
      const decodedToken: string | JwtPayload = await verifyToken(accessToken);

      const ekskul = await db.ekskul.findOne({
        where: { id: decodedToken["ekskul"] },
      });

      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {
        where: { ekskul_id: ekskul.id },
      };
      let limit: number;
      let offset: number;

      if (filter) {
        paramQuerySQL.where = {
          category: filter,
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
