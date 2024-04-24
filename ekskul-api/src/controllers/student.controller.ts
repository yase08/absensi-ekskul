import { Request, Response } from "express";
import { StudentService } from "../services/student.service";
import { APIResponse } from "../helpers/apiResponse.helper";

// Berfungsi untuk controller yang extends service, jadi bisa memakai semua property dan method dari student service
export class StudentController extends StudentService {
  createStudent = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.createStudentService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  getAllStudent = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.getAllStudentService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  getStudentOnAssessment = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse =
        await this.getStudentOnAssessmentService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  getStudentByEkskul = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.getStudentByEkskulService(
        req
      );
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  getStudentByEkskulAndGrade = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse =
        await this.getStudentByEkskulAndGradeService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  updateStudent = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.updateStudentService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  deleteStudent = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.deleteStudentService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  exportAllStudent = async (req: Request, res: Response): Promise<any> => {
    try {
      const serviceResponse: APIResponse = await this.exportAllStudentService(
        req,
        res
      );
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };
}
