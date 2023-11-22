import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

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

  async getAllRayonService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {};
      let limit: number;
      let offset: number;

      const totalRows = await db.rayon.count();

      if (filter) {
        paramQuerySQL.where = {
          name: {
            [Op.like]: `%${filter}%`,
          },
        };
      }

      if (sort) {
        const sortOrder = sort.startsWith("-") ? "DESC" : "ASC";
        const fieldName = sort.replace(/^-/, "");
        paramQuerySQL.order = [[fieldName, sortOrder]];
      }

      if (page && page.size && page.number) {
        limit = parseInt(page.size, 10);
        offset = (parseInt(page.number, 10) - 1) * limit;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      } else {
        limit = 10;
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }

      const rayon = await db.rayon.findAll(paramQuerySQL);

      if (!rayon) throw apiResponse(status.NOT_FOUND, "Rayons do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all rayons success", rayon, totalRows)
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

  async getRayonService(req: Request): Promise<any> {
    try {
      const rayon = await db.rayon.findOne({ where: { id: req.params.id } });

      if (!rayon) throw apiResponse(status.NOT_FOUND, "Rayon do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched rayon success", rayon)
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

  async updateRayonService(req: Request): Promise<any> {
    try {
      const rayonExist = await db.rayon.findOne({
        where: { id: req.params.id },
      });

      if (!rayonExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Rayon do not exist for the given id"
        );

      const rayonSame = await db.rayon.findOne({
        where: { name: req.body.name },
      });

      if (rayonSame && rayonSame.id !== rayonExist.id) {
        throw apiResponse(
          status.CONFLICT,
          `Rayon with the name ${req.body.name} already exists`
        );
      }

      const updateRayon = await db.rayon.update(req.body, {
        where: {
          id: rayonExist.id,
        },
      });

      if (!updateRayon)
        throw apiResponse(status.FORBIDDEN, "Update rayon failed");

      return Promise.resolve(apiResponse(status.OK, "Update rayon success"));
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

  async deleteRayonService(req: Request): Promise<any> {
    try {
      const rayonExist = await db.rayon.findOne({
        where: { id: req.params.id },
      });

      if (!rayonExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Rayon do not exist for the given id"
        );

      const deleteRayon = await db.rayon.destroy({
        where: { id: rayonExist.id },
      });

      if (!deleteRayon)
        throw apiResponse(status.FORBIDDEN, "Delete rayon failed");

      return Promise.resolve(apiResponse(status.OK, "Delete rayon success"));
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
