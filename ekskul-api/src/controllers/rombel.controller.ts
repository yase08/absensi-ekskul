import { Request, Response } from "express";
import { RombelService } from "../services/rombel.service";
import { APIResponse } from "../helpers/apiResponse.helper";

// Berfungsi untuk controller yang extends service, jadi bisa memakai semua property dan method dari rombel service
export class RombelController extends RombelService {
  createRombel = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.createRombelService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };
}
