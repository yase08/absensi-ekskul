import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";

// Berfungsi untuk menghandle logic dari controler
const db = require("../db/models/index.js");

export class RoleService {
  async createRoleService(req: Request): Promise<any> {
    try {
      const role = await db.role.findOne({
        where: { name: req.body.name },
      });

      if (role)
        throw apiResponse(
          status.CONFLICT,
          `Role ${req.body.name} already exist`
        );

      const createRayon = await db.role.create(req.body)
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

