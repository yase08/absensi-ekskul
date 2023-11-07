import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class ScheduleService {
  async createScheduleService(req: Request): Promise<any> {
    try {
      const createSchedule = await db.schedule.create(req.body);

      if (!createSchedule)
        throw apiResponse(status.FORBIDDEN, "Create new schedule failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new schedule success")
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

  async getAllScheduleService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {};
      let limit: number;
      let offset: number;

      paramQuerySQL.include = {
        model: db.activity,
        include: [
          { model: db.rombel, as: "rombel", attributes: ["name"] },
          { model: db.room, as: "room", attributes: ["name"] },
          { model: db.ekskul, as: "ekskul", attributes: ["name"] },
        ],
        attributes: { exclude: ["rombel_id", "room_id", "ekskul_id"] },
      };

      if (filter) {
        paramQuerySQL.where = {
          day: {
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

      const scheduleFilter = await db.schedule.findAll(paramQuerySQL);
      const schedules = await db.schedule.findAll({
        attributes: ["id", "day"],
      });

      if (!scheduleFilter)
        throw apiResponse(status.NOT_FOUND, "Schedules do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all schedules success", {
          scheduleFilter,
          schedules,
        })
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

  async getScheduleService(req: Request): Promise<any> {
    try {
      const schedules = await db.schedule.findAll({
        include: {
          model: db.activity,
          include: [
            { model: db.rombel, as: "rombel", attributes: ["name"] },
            { model: db.room, as: "room", attributes: ["name"] },
            { model: db.ekskul, as: "ekskul", attributes: ["name"] },
          ],
          attributes: { exclude: ["rombel_id", "room_id", "ekskul_id"] },
        },
      });

      if (!schedules)
        throw apiResponse(status.NOT_FOUND, "Schedule do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched schedule data", schedules)
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

  async createActivityOnScheduleService(req: Request): Promise<any> {
    try {
      const newActivity = await db.activity.create(req.body);

      if (!newActivity)
        throw apiResponse(status.FORBIDDEN, "Create new activity failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new schedule success")
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

  async updateActivityOnScheduleService(req: Request): Promise<any> {
    try {
      const activity = await db.activity.findOne({
        where: { id: req.params.id },
      });
      console.log(activity);

      if (!activity)
        throw apiResponse(status.NOT_FOUND, "Activity does not exist");

      const updateActivity = await db.activity.update(req.body, {
        where: { id: activity.id },
      });

      if (!updateActivity)
        throw apiResponse(status.NOT_FOUND, "Cant update activity");

      return Promise.resolve(apiResponse(status.OK, "Update activity success"));
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

  async deleteActivityOnScheduleService(req: Request): Promise<any> {
    try {
      const activity = await db.activity.findOne({
        where: { id: req.params.id },
      });
      console.log(activity);

      if (!activity)
        throw apiResponse(status.NOT_FOUND, "Activity does not exist");

      const updateActivity = await db.activity.destroy({
        where: { id: activity.id },
      });

      if (!updateActivity)
        throw apiResponse(status.NOT_FOUND, "Cant delete activity");

      return Promise.resolve(apiResponse(status.OK, "Delete activity success"));
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
