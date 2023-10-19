import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class TaskService {
  async createTaskService(req: Request): Promise<any> {
    try {
      const task = await db.task.findOne({
        where: { name: req.body.name },
      });

      if (task)
        throw apiResponse(
          status.CONFLICT,
          `Task ${req.body.name} already exist`
        );

      const createTask = await db.task.create(req.body);

      if (!createTask)
        throw apiResponse(status.FORBIDDEN, "Create new task failed");

      return Promise.resolve(apiResponse(status.OK, "Create new task success"));
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

  async getAllTaskService(req: Request): Promise<any> {
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

      const taskFilter = await db.task.findAll(paramQuerySQL);
      const tasks = await db.task.findAll({
        attributes: ["id", "name"],
      });

      if (!taskFilter)
        throw apiResponse(status.NOT_FOUND, "Tasks do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all tasks success", {
          taskFilter,
          tasks,
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

  async getTaskService(req: Request): Promise<any> {
    try {
      const task = await db.task.findOne({ where: { id: req.params.id } });

      if (!task) throw apiResponse(status.NOT_FOUND, "Task do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched task success", task)
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

  async updateTaskService(req: Request): Promise<any> {
    try {
      const taskExist = await db.task.findOne({
        where: { id: req.params.id },
      });

      if (!taskExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Tasks do not exist for the given member_id"
        );

      const updateTask = await db.task.update(req.body);

      if (!updateTask)
        throw apiResponse(status.FORBIDDEN, "Update task failed");

      return Promise.resolve(apiResponse(status.OK, "Update task success"));
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

  async deleteTaskService(req: Request): Promise<any> {
    try {
      const taskExist = await db.task.findOne({
        where: { id: req.params.id },
      });

      if (!taskExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Tasks do not exist for the given member_id"
        );

      const deleteTask = await db.task.delete({
        where: { id: taskExist.id },
      });

      if (!deleteTask)
        throw apiResponse(status.FORBIDDEN, "Delete task failed");

      return Promise.resolve(apiResponse(status.OK, "Delete task success"));
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
