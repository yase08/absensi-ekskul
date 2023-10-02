import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

// Berfungsi untuk menghandle logic dari controler

const prisma = new PrismaClient();

export class EkskulCategoryService {
  async createEkskulCategoryService(req: Request): Promise<any> {
    try {
      const ekskulCategory = await prisma.ekskulCategory.findFirst({
        where: { name: req.body.name },
      });

      if (ekskulCategory)
        throw apiResponse(
          status.NOT_FOUND,
          `Ekskul Category ${req.body.name} already exist`
        );

      const createEkskulCategory = await prisma.ekskulCategory.create({
        data: req.body,
      });
      if (!createEkskulCategory)
        throw apiResponse(status.FORBIDDEN, "Create new ekskul category failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new ekskul category success")
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
