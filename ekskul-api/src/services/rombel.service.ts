import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

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

  async getAllRombelService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {};
      let limit: number;
      let offset: number;

      if (filter) {
        paramQuerySQL.where = {
          name: { [Op.iLike]: `%${filter}%` },
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

      const rombels = await db.rombel.findAll(paramQuerySQL);

      if (!rombels) throw apiResponse(status.NOT_FOUND, "Rombel do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all rombels success", rombels)
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

  async updateRombelService(req: Request): Promise<any> {
    try {
      const rombelExist = await db.rombel.findOne({
        where: { id: req.params.id },
      });
  
      if (!rombelExist) {
        throw apiResponse(
          status.NOT_FOUND,
          "Rombel does not exist for the given id"
        );
      }
  
      const rombelSame = await db.rombel.findOne({
        where: { name: req.body.name },
      });
  
      if (rombelSame && rombelSame.id !== rombelExist.id) {
        throw apiResponse(
          status.CONFLICT,
          `Rombel with the name ${req.body.name} already exists`
        );
      }
  
      const updateRombel = await db.rombel.update(req.body, {
        where: {
          id: rombelExist.id,
        },
      });
  
      if (!updateRombel) {
        throw apiResponse(status.FORBIDDEN, "Update rombel failed");
      }
  
      return Promise.resolve(apiResponse(status.OK, "Update rombel success"));
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

  async deleteRombelService(req: Request): Promise<any> {
    try {
      const rombelExist = await db.rombel.findOne({
        where: { id: req.params.id },
      });

      if (!rombelExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Rombel do not exist for the given id"
        );

      const deleteRombel = await db.rombel.destroy({
        where: { id: rombelExist.id },
      });

      if (!deleteRombel)
        throw apiResponse(status.FORBIDDEN, "Delete rombel failed");

      return Promise.resolve(apiResponse(status.OK, "Delete rombel success"));
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
