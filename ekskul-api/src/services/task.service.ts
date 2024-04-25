import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";
import { ISession } from "../interfaces/user.interface";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class TaskService {
  async createTaskService(req: Request): Promise<any> {
    try {
      const instructor_Id = (req.session as ISession).user.id;
      const task = await db.task.findOne({
        where: { name: req.body.name },
      });

      if (task)
        throw apiResponse(
          status.CONFLICT,
          `Tugas dengan nama ${req.body.name} sudah ada`
        );

      const createTask = await db.task.create({
        author_id: instructor_Id,
        ...req.body,
      });

      console.log(createTask)

      if (!createTask)
        throw apiResponse(status.FORBIDDEN, "Gagal membuat tugas");

      return Promise.resolve(apiResponse(status.OK, "Berhasil membuat tugas"));
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
      const paramQuerySQL: any = {};
      if ((req.session as ISession).user.role === "admin") {
        paramQuerySQL.include = [
          {
            model: db.ekskul,
            as: "ekskuls",
            attributes: ["id", "name"],
          },
          {
            model: db.user,
            as: "users",
            attributes: ["id", "name"],
          },
        ];
      } else if ((req.session as ISession).user.role === "instructor") {
        paramQuerySQL.include = [
          {
            model: db.ekskul,
            as: "ekskuls",
            attributes: ["id", "name"],
          },
          {
            model: db.user,
            as: "users",
            attributes: ["id", "name"],
          },
        ];
        paramQuerySQL.where = {
          author_id: (req.session as ISession).user.id,
        };
      }

      const task = await db.task.findAll(paramQuerySQL);

      const modifiedTask = task.map((task) => {
        return {
          id: task.id,
          name: task.name,
          ekskul: {
            id: task?.ekskuls?.id,
            name: task?.ekskuls?.name,
          },
          user: task.users?.name,
          date: task.date,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        };
      });

      if (!task || task.length === 0)
        throw apiResponse(status.NOT_FOUND, "Tugas tidak ditemukan");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan tugas", modifiedTask)
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
          "Tugas dengan id tersebut tidak ditemukan"
        );

      const taskSame = await db.task.findOne({
        where: { name: req.body.name },
      });

      if (taskSame && taskSame.id !== taskExist.id) {
        throw apiResponse(
          status.CONFLICT,
          `Tugas dengan nama ${req.body.name} sudah ada`
        );
      }

      const updateTask = await db.task.update(req.body, {
        where: {
          id: taskExist.id,
        },
      });

      if (!updateTask)
        throw apiResponse(status.FORBIDDEN, "Update tugas gagal");

      return Promise.resolve(apiResponse(status.OK, "Update tugas berhasil"));
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
          "Tugas dengan id tersebut tidak ditemukan"
        );

      const deleteTask = await db.task.destroy({
        where: { id: taskExist.id },
      });

      if (!deleteTask)
        throw apiResponse(status.FORBIDDEN, "Gagal menghapus tugas");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil menghapus tugas")
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
