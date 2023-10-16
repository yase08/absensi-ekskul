import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class ActivityProgramService {
  async createActivityProgramService(req: Request): Promise<any> {
    try {
      const activityProgram = await db.activityProgram.findOne({ where: { name: req.body.name } });

      if (activityProgram)
        throw apiResponse(
          status.CONFLICT,
          `Activity program ${req.body.name} already exist`
        );

      const createActivityProgram = await db.activityProgram.create(req.body);

      if (!createActivityProgram)
        throw apiResponse(status.FORBIDDEN, "Create new activity program failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new activity program success")
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
