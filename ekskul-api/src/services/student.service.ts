import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";

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
          `Student ${req.body.name} already exist`
        );

      const ekskuls = await db.ekskul.findAll({
        where: { id: req.body.ekskuls },
      });

      const createStudent = await db.student.create(req.body);
      await createStudent.addEkskul(ekskuls);

      if (!createStudent)
        throw apiResponse(status.FORBIDDEN, "Create new student failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new student success")
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
