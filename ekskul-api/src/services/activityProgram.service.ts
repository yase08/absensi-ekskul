import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

// Berfungsi untuk menghandle logic dari controler

const prisma = new PrismaClient();

export class ActivityProgramService {
  async createActivityProgramService(req: Request): Promise<any> {
    try {
      const createActivityProgram = await prisma.activityProgram.create({
        data: req.body,
      });

      if (!createActivityProgram)
        throw apiResponse(
          status.FORBIDDEN,
          "Create new activity Program failed"
        );

      return Promise.resolve(
        apiResponse(status.OK, "Create new activity Program success")
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
