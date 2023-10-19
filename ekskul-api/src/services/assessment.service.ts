import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { Op } from "sequelize";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class AssessmentService {
  async createAssessmentService(req: Request): Promise<any> {
    try {      
      
      const createAssessmentPromises =[];

      for (const assessment of req.body) {     
          const existingAssessment = await db.assessment.findOne({
            where: {
              student_id: assessment.student_id,
              task_id: assessment.task_id
            }
          });
          if (existingAssessment) {
            throw apiResponse(
              status.CONFLICT,
              `Assessment for student ${assessment.student_id} and task ${assessment.task_id} already exists`
            );
          }
          await db.assessment.create({
            student_id: assessment.student_id,
            task_id: assessment.task_id,
            grade: assessment.grade
          });
        }
      const createAttendances = await Promise.all(createAssessmentPromises);

      if (!createAttendances)
      throw apiResponse(status.FORBIDDEN, "Create new attendances failed");


      return Promise.resolve(
        apiResponse(status.OK, "Create new assessment success")
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

  async getAllAssessmentService(req: Request): Promise<any> {
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

      const assessmentFilter = await db.assessment.findAll(paramQuerySQL);
      const assessments = await db.assessment.findAll({
        attributes: ["id", "name"],
      });

      if (!assessmentFilter)
        throw apiResponse(status.NOT_FOUND, "Assessments do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all assessments success", {
          assessmentFilter,
          assessments,
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

  async getOneAssessmentService(req: Request): Promise<any> {
    try {
      const assessment = await db.assessment.findOne({where: {id: req.params.id}});

      if (!assessment) throw apiResponse(status.NOT_FOUND, "Assessment do not exist");

      return Promise.resolve(
        apiResponse(status.OK, "Fetched all asesssment success", assessment)
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

  async updateAssessmentService(req: Request): Promise<any> {
    try {
      const assessmentExist = await db.assessment.findOne({
        where: { id: req.params.id },
      });

      if (!assessmentExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Assessments do not exist for the given member_id"
        );

      const updateAssessment = await db.assessment.update(req.body);

      if (!updateAssessment)
        throw apiResponse(status.FORBIDDEN, "Update assessment failed");

      return Promise.resolve(apiResponse(status.OK, "Update assessment success"));
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

  async deleteAssessmentService(req: Request): Promise<any> {
    try {
      const assessmentExist = await db.assessment.findOne({
        where: { id: req.params.id },
      });

      if (!assessmentExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Assessments do not exist for the given member_id"
        );

      const deleteAssessment = await db.assessment.delete({
        where: { id: assessmentExist.id },
      });

      if (!deleteAssessment)
        throw apiResponse(status.FORBIDDEN, "Delete assessment failed");

      return Promise.resolve(apiResponse(status.OK, "Delete assessment success"));
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
