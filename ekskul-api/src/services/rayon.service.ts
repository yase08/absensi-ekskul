import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class RayonService {
  async createRayonService(req: Request): Promise<any> {
    try {
      const rayon = await db.rayon.findOne({ where: { name: req.body.name } });

      if (rayon)
        throw apiResponse(
          status.CONFLICT,
          `Rayon ${req.body.name} already exist`
        );

      const createRayon = await db.rayon.create(req.body);

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
