import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

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

  async getAllEkskulService(req: Request): Promise<any> {
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

      const ekskuls = await db.ekskul.findAll(paramQuerySQL);

      if (!ekskuls) throw apiResponse(status.NOT_FOUND, "Ekskuls do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all ekskuls success", ekskuls)
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

  async updateEkskulService(req: Request): Promise<any> {
    try {
      const ekskulExist = await db.ekskul.findOne({
        where: { id: req.params.id },
      });

      if (!ekskulExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Ekskuls do not exist for the given member_id"
        );

      const updateEkskul = await db.ekskul.update(req.body);

      if (!updateEkskul)
        throw apiResponse(status.FORBIDDEN, "Update ekskul failed");

      return Promise.resolve(apiResponse(status.OK, "Update ekskul success"));
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

  async deleteEkskulService(req: Request): Promise<any> {
    try {
      const ekskulExist = await db.ekskul.findOne({
        where: { id: req.params.id },
      });

      if (!ekskulExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Ekskuls do not exist for the given member_id"
        );

      const deleteEkskul = await db.ekskul.destroy({
        where: { id: ekskulExist.id },
      });

      if (!deleteEkskul)
        throw apiResponse(status.FORBIDDEN, "Delete ekskul failed");

      return Promise.resolve(apiResponse(status.OK, "Delete ekskul success"));
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
