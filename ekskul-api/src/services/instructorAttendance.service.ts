import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";
import { Session } from "express-session";
import { verifyToken } from "../libs/jwt.lib";

interface ISession extends Session {
  user: any;
}

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class InstructorAttendanceService {
  async createInstructorAttendanceService(req: Request): Promise<any> {
    try {
      const instructor_Id = (req.session as ISession).user.id;
      const ekskulIds = (req.session as ISession).user.ekskul;

      const selectedEkskulId = Number(req.query.ekskul_id);

      if (ekskulIds.includes(selectedEkskulId)) {
        const userOnEkskul = await db.userOnEkskul.findOne({
          where: { user_id: instructor_Id, ekskul_id: selectedEkskulId },
        });

        if (userOnEkskul) {
          // Jika terkait, buat data kehadiran
          const createInstructorAttendance = db.instructorAttendance.create({
            ...req.body,
            ekskul_id: selectedEkskulId,
            instructor_id: instructor_Id,
          });
          if (!createInstructorAttendance)
            throw apiResponse(status.FORBIDDEN, "Create new instructor failed");

          return Promise.resolve(
            apiResponse(status.OK, "Create new instructor success")
          );
        } else {
          // Jika tidak terkait, lewati data kehadiran ini dan beri respons error
          throw apiResponse(
            status.FORBIDDEN,
            `Instructor with ID ${instructor_Id} is not associated with the selected ekskul`
          );
        }
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

  async getAllInstructorAttendanceService(req: Request): Promise<any> {
    const ekskulIds = (req.session as ISession).user.ekskul;
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
          name: { [Op.like]: `%${filter}%` },
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
        if (ekskulIds.length > 1) {
          paramQuerySQL.where = {
            ekskul_id: ekskulIds,
          };
        } else if (ekskulIds.length === 1) {
          paramQuerySQL.where = {
            ekskul_id: ekskulIds[0],
          };
        }
      }

      const instructorAttendanceFilter = await db.instructorAttendance.findAll(
        paramQuerySQL
      );
      const instructors = await db.instructorAttendance.findAll({
        attributes: ["id", "name"],
      });

      if (!instructorAttendanceFilter)
        throw apiResponse(status.NOT_FOUND, "Instructors do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all instructor success", {
          instructorAttendanceFilter,
          instructors,
        })
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

  async getInstructorAttendanceService(req: Request): Promise<any> {
    try {
      const instructorAttendance = await db.instructorAttendance.findOne({
        where: { id: req.params.id },
      });

      if (!instructorAttendance)
        throw apiResponse(
          status.NOT_FOUND,
          "Instructor attendance do not exist"
        );

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Fetched instructor attendance success",
          instructorAttendance
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

  async updateInstructorAttendanceService(req: Request): Promise<any> {
    try {
      const instructorExist = await db.instructorAttendance.findOne({
        where: { id: req.params.id },
      });

      if (!instructorExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Instructors do not exist for the given id"
        );

      const updateInstructor = await db.instructorAttendance.update(req.body);

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
      const instructorExist = await db.instructorAttendance.findOne({
        where: { id: req.params.id },
      });

      if (!instructorExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Instructors do not exist for the given member_id"
        );

      const deleteInstructor = await db.instructorAttendance.destroy({
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
