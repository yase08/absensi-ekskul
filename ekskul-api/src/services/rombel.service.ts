import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

// Berfungsi untuk menghandle logic dari controler

const prisma = new PrismaClient();

export class RombelService {
  async createRombelService(req: Request): Promise<any> {
    try {
      const rombel = await prisma.rombel.findFirst({
        where: { name: req.body.name },
      });

      if (rombel)
        throw apiResponse(
          status.NOT_FOUND,
          `Rombel ${req.body.name} already exist`
        );

      const createRayon = await prisma.rombel.create({
        data: req.body,
      });
      if (!createRayon)
        throw apiResponse(status.FORBIDDEN, "Create new rombel failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new rombel success")
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
