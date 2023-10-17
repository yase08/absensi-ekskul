import { Request, Response } from "express";
import { ActivityProgramService } from "../services/activityProgram.service";
import { APIResponse } from "../helpers/apiResponse.helper";

// Berfungsi untuk controller yang extends service, jadi bisa memakai semua property dan method dari activityProgram service
export class ActivityProgramController extends ActivityProgramService {
  createActivityProgram = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse =
        await this.createActivityProgramService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  getAllActivityProgram = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse =
        await this.getAllActivityProgramService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  getActivityProgram = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.getActivityProgramService(
        req
      );
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  updateActivityProgram = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse =
        await this.updateActivityProgramService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };

  deleteActivityProgram = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const serviceResponse: APIResponse =
        await this.deleteActivityProgramService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };
}
