import { Request, Response } from "express";
import { AttendanceService } from "../services/attendance.service";
import { APIResponse } from "../helpers/apiResponse.helper";

// Berfungsi untuk controller yang extends service, jadi bisa memakai semua property dan method dari attendance service
export class AttendanceController extends AttendanceService {
  createAttendance = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.createAttendanceService(
        req
      );
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  exportToExcelByInstructor = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const serviceResponse: APIResponse =
        await this.exportAttendanceByInstructorService(req, res);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  exportToExcel = async (req: Request, res: Response): Promise<any> => {
    try {
      const serviceResponse: APIResponse = await this.exportAttendanceService(
        req,
        res
      );
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  getAllAttendance = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceResponse: APIResponse =
        await this.getStudentAttendanceService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  getDetailAttendance = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse =
        await this.getDetailAttendanceService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  getMonthlyAttendance = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse =
        await this.getMonthlyAttendanceService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  getSemesterlyAttendance = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse =
        await this.getSemesterlyAttendanceService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  getDailyAttendance = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.getDailyAttendanceService(
        req
      );
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  updateAttendance = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.updateAttendanceService(
        req
      );
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };
}
