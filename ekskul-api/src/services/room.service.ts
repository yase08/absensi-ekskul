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

  async getAllRoomService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {};
      let limit: number;
      let offset: number;
      
      const totalRows = await db.room.count();

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

      const room = await db.room.findAll(paramQuerySQL);

      if (!room)
        throw apiResponse(status.NOT_FOUND, "Rooms do not exist");

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Fetched all rooms success",
          room,
          totalRows,
        )
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

  async getRoomService(req: Request): Promise<any> {
    try {
      const room = await db.room.findOne({ where: { id: req.params.id } });

      if (!room) throw apiResponse(status.NOT_FOUND, "Room do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched room success", room)
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
          "Room do not exist for the given id"
        );

      const roomSame = await db.room.findOne({
        where: { name: req.body.name },
      });

      if (roomSame && roomSame.id !== roomExist.id) {
        throw apiResponse(
          status.CONFLICT,
          `Room with the name ${req.body.name} already exists`
        );
      }

      const updateRoom = await db.room.update(req.body, {
        where: {
          id: roomExist.id,
        },
      });

      if (!updateRoom)
        throw apiResponse(status.FORBIDDEN, "Update room failed");

      return Promise.resolve(apiResponse(status.OK, "Update room success"));
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
          "Room do not exist for the given id"
        );

      const deleteRoom = await db.room.destroy({
        where: { id: roomExist.id },
      });

      if (!deleteRoom)
        throw apiResponse(status.FORBIDDEN, "Delete room failed");

      return Promise.resolve(apiResponse(status.OK, "Delete room success"));
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
