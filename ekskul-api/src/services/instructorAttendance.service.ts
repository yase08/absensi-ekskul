import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";
import { Session } from "express-session";

interface ISession extends Session {
  user: any;
}

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class InstructorAttendanceService {
  async createInstructorAttendanceService(req: Request): Promise<any> {
    try {
      const instructor_Id = (req.session as ISession).user.id;

      const createInstructorAttendance = await db.instructorAttendance.create({
        ...req.body,
        instructor_Id,
      });

      if (!createInstructorAttendance)
        throw apiResponse(status.FORBIDDEN, "Create new instructor failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new instructor success")
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

  async getAllInstructorAttendanceService(req: Request): Promise<any> {
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
        limit = 10;
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }

      const instructors = await db.instructor.findAll(paramQuerySQL);

      if (!instructors)
        throw apiResponse(status.NOT_FOUND, "Instructors do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all instructors success", instructors)
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

  async updateInstructorAttendanceService(req: Request): Promise<any> {
    try {
      const instructorExist = await db.instructor.findOne({
        where: { id: req.params.id },
      });

      if (!instructorExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Instructors do not exist for the given member_id"
        );

      const updateInstructor = await db.instructor.update(req.body);

      if (!updateInstructor)
        throw apiResponse(status.FORBIDDEN, "Update instructor failed");

      return Promise.resolve(
        apiResponse(status.OK, "Update instructor success")
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

  async deleteInstructorAttendanceService(req: Request): Promise<any> {
    try {
      const instructorExist = await db.instructor.findOne({
        where: { id: req.params.id },
      });

      if (!instructorExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Instructors do not exist for the given member_id"
        );

      const deleteInstructor = await db.instructor.destroy({
        where: { id: instructorExist.id },
      });

      if (!deleteInstructor)
        throw apiResponse(status.FORBIDDEN, "Delete instructor failed");

      return Promise.resolve(
        apiResponse(status.OK, "Delete instructor success")
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
