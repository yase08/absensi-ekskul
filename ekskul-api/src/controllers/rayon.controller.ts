import { Request, Response } from "express";
import { RayonService } from "../services/rayon.service";
import { APIResponse } from "../helpers/apiResponse.helper";

// Berfungsi untuk controller yang extends service, jadi bisa memakai semua property dan method dari rayon service
export class RayonController extends RayonService {
  createRayon = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.createRayonService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };
}
