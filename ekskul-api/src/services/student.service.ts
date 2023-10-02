import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

// Berfungsi untuk menghandle logic dari controler

const prisma = new PrismaClient();

export class StudentService {
  async createStudentService(req: Request): Promise<any> {
    try {
      const student = await prisma.student.findFirst({
        where: { nis: req.body.nis },
      });

      if (student)
        throw apiResponse(
          status.CONFLICT,
          `Student ${req.body.name} already exist`
        );

      const createStudent = await prisma.student.create({
        data: {
          ...req.body,
          ekskuls: {
            create: req.body.ekskuls.map((ekskulId) => {
              return {
                ekskul: {
                  connect: {
                    id: ekskulId,
                  },
                },
              };
            }),
          },
        },
      });

      if (!createStudent)
        throw apiResponse(status.FORBIDDEN, "Create new student failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new student success")
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
