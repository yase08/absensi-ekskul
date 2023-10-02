import { Request, Response } from "express";
import { RoleService } from "../services/role.service";
import { APIResponse } from "../helpers/apiResponse.helper";

// Berfungsi untuk controller yang extends service, jadi bisa memakai semua property dan method dari role service
export class RoleController extends RoleService {
  createRole = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceResponse: APIResponse = await this.createRoleService(req);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };
}
