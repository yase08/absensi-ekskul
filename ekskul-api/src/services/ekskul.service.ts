import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class EkskulService {
  async createEkskulService(req: Request): Promise<any> {
    try {
      const ekskul = await db.ekskul.findOne({
        where: { name: req.body.name },
      });

      if (ekskul)
        throw apiResponse(
          status.CONFLICT,
          `Ekskul ${req.body.name} already exist`
        );

      const createEkskul = await db.ekskul.create(req.body);

      if (!createEkskul)
        throw apiResponse(status.FORBIDDEN, "Create new ekskul failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new ekskul success")
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
