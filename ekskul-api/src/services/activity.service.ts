import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class ActivityService {
  async createActivityService(req: Request): Promise<any> {
    try {
      const createActivity = await db.activity.create(req.body);

      if (!createActivity)
        throw apiResponse(status.FORBIDDEN, "Create new activity failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new activity success")
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

  async getAllActivityService(req: Request): Promise<any> {
    try {
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {};
      let limit: number;
      let offset: number;

      paramQuerySQL.attributes = [
        "id",
        "startTime",
        "endTime",
        "createdAt",
        "updatedAt",
      ];

      paramQuerySQL.include = [
        { model: db.rombel, as: "rombel", attributes: ["name"] },
        { model: db.room, as: "room", attributes: ["name"] },
        { model: db.ekskul, as: "ekskul", attributes: ["name"] },
        { model: db.schedule, as: "schedule", attributes: ["day"] },
      ];

      if (sort) {
        const sortOrder = sort.startsWith("-") ? "DESC" : "ASC";
        const fieldName = sort.replace(/^-/, "");
        paramQuerySQL.order = [[fieldName, sortOrder]];
      }

      if (page && page.size && page.number) {
        limit = parseInt(page.size);
        offset = (parseInt(page.number) - 1) * limit;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      } else {
        limit = 10;
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }

      if (filter) {
        paramQuerySQL.where = {
          schedule_id: parseInt(filter),
        };
      }

      const activityFilter = await db.activity.findAll(paramQuerySQL);

      if (!activityFilter || activityFilter.length === 0) {
        throw apiResponse(status.NOT_FOUND, "Activities do not exist");
      }

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all activities success", {
          activityFilter,
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

  async getActivityService(req: Request): Promise<any> {
    try {
      const activity = await db.activity.findOne({
        where: { id: req.params.id },
      });

      if (!activity)
        throw apiResponse(status.NOT_FOUND, "Activity do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched activity success", activity)
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

  async updateActivityService(req: Request): Promise<any> {
    try {
      const activityExist = await db.activity.findOne({
        where: { id: req.params.id },
      });

      if (!activityExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Activity do not exist for the given id"
        );

      const activitySame = await db.activity.findOne({
        where: { name: req.body.name },
      });

      if (activitySame && activitySame.id !== activityExist.id) {
        throw apiResponse(
          status.CONFLICT,
          `Activity with the name ${req.body.name} already exists`
        );
      }

      const updateActivity = await db.activity.update(req.body, {
        where: {
          id: activityExist.id,
        },
      });

      if (!updateActivity)
        throw apiResponse(status.FORBIDDEN, "Update activity failed");

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

  async deleteActivityService(req: Request): Promise<any> {
    try {
      const activityExist = await db.activity.findOne({
        where: { id: req.params.id },
      });

      if (!activityExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Activity do not exist for the given id"
        );

      const deleteActivity = await db.activity.destroy({
        where: { id: activityExist.id },
      });

      if (!deleteActivity)
        throw apiResponse(status.FORBIDDEN, "Delete activity failed");

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
