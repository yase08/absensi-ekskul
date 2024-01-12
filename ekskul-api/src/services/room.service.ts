import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class RoomService {
  async createRoomService(req: Request): Promise<any> {
    try {
      const room = await db.room.findOne({ where: { name: req.body.name } });

      if (room)
        throw apiResponse(
          status.CONFLICT,
          `Room dengan nama ${req.body.name} sudah ada`
        );

      const createRoom = await db.room.create(req.body);

      if (!createRoom)
        throw apiResponse(status.FORBIDDEN, "Gagal membuat room");

      return Promise.resolve(
        apiResponse(status.OK, "Room berhasil dibuat")
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

  async getAllRoomService(req: Request): Promise<any> {
    try {

      const paramQuerySQL: any = {};
      const room = await db.room.findAll(paramQuerySQL);

      if (!room || room.length === 0) throw apiResponse(status.NOT_FOUND, "Room tidak ditemukan");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan room", room)
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

  async updateRoomService(req: Request): Promise<any> {
    try {
      const roomExist = await db.room.findOne({
        where: { id: req.params.id },
      });

      if (!roomExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Room dengan id tersebut tidak ditemukan"
        );

      const roomSame = await db.room.findOne({
        where: { name: req.body.name },
      });

      if (roomSame && roomSame.id !== roomExist.id) {
        throw apiResponse(
          status.CONFLICT,
          `Room dengan nama ${req.body.name} sudah ada`
        );
      }

      const updateRoom = await db.room.update(req.body, {
        where: {
          id: roomExist.id,
        },
      });

      if (!updateRoom)
        throw apiResponse(status.FORBIDDEN, "Update room gagal");

      return Promise.resolve(apiResponse(status.OK, "Update room berhasil"));
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

  async deleteRoomService(req: Request): Promise<any> {
    try {
      const roomExist = await db.room.findOne({
        where: { id: req.params.id },
      });

      if (!roomExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Room dengan id tersebut tidak ditemukan"
        );

      const deleteRoom = await db.room.destroy({
        where: { id: roomExist.id },
      });

      if (!deleteRoom)
        throw apiResponse(status.FORBIDDEN, "Gagal menghapus room");

      return Promise.resolve(apiResponse(status.OK, "Berhasil menghapus room"));
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
