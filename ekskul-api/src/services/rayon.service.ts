import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

// Berfungsi untuk menghandle logic dari controler

const prisma = new PrismaClient();

export class RayonService {
  async createRayonService(req: Request): Promise<any> {
    try {
      const rayon = await prisma.rayon.findFirst({
        where: { name: req.body.name },
      });

      if (rayon)
        throw apiResponse(
          status.NOT_FOUND,
          `Rayon ${req.body.name} already exist`
        );

      const createRayon = await prisma.rayon.create({
        data: req.body,
      });
      if (!createRayon)
        throw apiResponse(status.FORBIDDEN, "Create new rayon failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new rayon success")
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
