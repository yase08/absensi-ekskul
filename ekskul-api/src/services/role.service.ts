import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

// Berfungsi untuk menghandle logic dari controler

const prisma = new PrismaClient();

export class RoleService {
  async createRoleService(req: Request): Promise<any> {
    try {
      const role = await prisma.role.findFirst({
        where: { name: req.body.name },
      });

      if (role)
        throw apiResponse(
          status.NOT_FOUND,
          `Role ${req.body.name} already exist`
        );

      const createRayon = await prisma.role.create({
        data: req.body,
      });
      if (!createRayon)
        throw apiResponse(status.FORBIDDEN, "Create new role failed");

      return Promise.resolve(apiResponse(status.OK, "Create new role success"));
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
