import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class RoomService {
  async createRoomService(req: Request): Promise<any> {
    try {
      const room = await db.room.findOne({
        where: { name: req.body.name },
      });

      if (room)
        throw apiResponse(
          status.CONFLICT,
          `Room ${req.body.name} already exist`
        );

      const createRoom = await db.room.create(req.body);

      if (!createRoom)
        throw apiResponse(status.FORBIDDEN, "Create new room failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new room success")
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
