import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class EkskulService {
  async createEkskulService(req: Request): Promise<any> {
    try {
      const ekskul = await db.ekskul.findOne({
        where: { name: req.body.name },
      });

      if (ekskul)
        throw apiResponse(
          status.CONFLICT,
          `Ekskul dengan nama ${req.body.name} sudah ada`
        );

      const createEkskul = await db.ekskul.create(req.body);

      if (!createEkskul)
        throw apiResponse(status.FORBIDDEN, "Gagal membuat ekskul");

      return Promise.resolve(apiResponse(status.OK, "Ekskul berhasil dibuat"));
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
      const paramQuerySQL: any = {};

      const ekskul = await db.ekskul.findAll(paramQuerySQL);

      if (!ekskul || ekskul.length === 0)
        throw apiResponse(status.NOT_FOUND, "Ekskul tidak ditemukan");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan ekskul", ekskul)
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
          "Ekskul dengan id tersebut tidak ditemukan"
        );

      const ekskulSame = await db.ekskul.findOne({
        where: { name: req.body.name },
      });

      if (ekskulSame && ekskulSame.id !== ekskulExist.id) {
        throw apiResponse(
          status.CONFLICT,
          `Ekskul dengan nama ${req.body.name} sudah ada`
        );
      }

      const updateEkskul = await db.ekskul.update(req.body, {
        where: {
          id: ekskulExist.id,
        },
      });

      if (!updateEkskul)
        throw apiResponse(status.FORBIDDEN, "Update ekskul gagal");

      return Promise.resolve(apiResponse(status.OK, "Update ekskul berhasil"));
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
          "Ekskul dengan id tersebut tidak ditemukan"
        );

      const deleteEkskul = await db.ekskul.destroy({
        where: { id: ekskulExist.id },
      });

      if (!deleteEkskul)
        throw apiResponse(status.FORBIDDEN, "Gagal menghapus ekskul");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil menghapus ekskul")
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
