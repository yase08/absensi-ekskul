import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

// Berfungsi untuk menghandle logic dari controler

const prisma = new PrismaClient();

export class ScheduleService {
  async createScheduleService(req: Request): Promise<any> {
    try {
      const schedule = await prisma.schedule.findFirst({
        where: { day: req.body.day },
      });

      if (schedule)
        throw apiResponse(
          status.NOT_FOUND,
          `Schedule ${req.body.name} already exist`
        );

      const createSchedule = await prisma.schedule.create({
        data: {
          ...req.body,
          ekskuls: {
            create: req.body.ekskuls.map((ekskulId) => {
              return {
                ekskul: {
                  connect: {
                    id: ekskulId,
                  },
                },
              };
            }),
          },
        },
      });

      if (!createSchedule)
        throw apiResponse(status.FORBIDDEN, "Create new schedule failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new schedule success")
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
