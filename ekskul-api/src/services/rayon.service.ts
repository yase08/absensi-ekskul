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
          `Rayon dengan nama ${req.body.name} sudah ada`
        );

      const createRayon = await db.rayon.create(req.body);

      if (!createRayon)
        throw apiResponse(status.FORBIDDEN, "Gagal membuat rayon");

      return Promise.resolve(apiResponse(status.OK, "Rayon berhasil dibuat"));
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
      const paramQuerySQL: any = {};
      const rayon = await db.rayon.findAll(paramQuerySQL);

      if (!rayon || rayon.length === 0)
        throw apiResponse(status.NOT_FOUND, "Rayon tidak ditemukan");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan rayon", rayon)
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
          "Rayon dengan id tersebut tidak ditemukan"
        );

      const rayonSame = await db.rayon.findOne({
        where: { name: req.body.name },
      });

      if (rayonSame && rayonSame.id !== rayonExist.id) {
        throw apiResponse(
          status.CONFLICT,
          `Rayon dengan nama ${req.body.name} sudah ada`
        );
      }

      const updateRayon = await db.rayon.update(req.body, {
        where: {
          id: rayonExist.id,
        },
      });

      if (!updateRayon)
        throw apiResponse(status.FORBIDDEN, "Update rayon gagal");

      return Promise.resolve(apiResponse(status.OK, "Update rayon berhasil"));
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
          "Rayon dengan id tersebut tidak ditemukan"
        );

      const deleteRayon = await db.rayon.destroy({
        where: { id: rayonExist.id },
      });

      if (!deleteRayon)
        throw apiResponse(status.FORBIDDEN, "Gagal menghapus rayon");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil menghapus rayon")
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
