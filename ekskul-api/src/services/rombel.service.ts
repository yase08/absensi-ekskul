import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class RombelService {
  async createRombelService(req: Request): Promise<any> {
    try {
      const rombel = await db.rombel.findOne({
        where: { name: req.body.name },
      });

      if (rombel)
        throw apiResponse(
          status.CONFLICT,
          `Rombel ${req.body.name} already exist`
        );

      const createRombel = await db.rombel.create(req.body);

      if (!createRombel)
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
