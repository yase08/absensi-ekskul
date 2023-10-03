import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

// Berfungsi untuk menghandle logic dari controler

const prisma = new PrismaClient();

export class RoomService {
  async createRoomService(req: Request): Promise<any> {
    try {
      const createRoom = await prisma.room.create({
        data: req.body,
      });

      if (!createRoom)
        throw apiResponse(status.FORBIDDEN, "Create new room failed");

      return Promise.resolve(apiResponse(status.OK, "Create new room success"));
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
