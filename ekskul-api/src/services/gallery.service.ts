import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

// Berfungsi untuk menghandle logic dari controler

const prisma = new PrismaClient();

export class GalleryService {
  async createGalleryService(req: Request): Promise<any> {
    try {
      const createGallery = await prisma.gallery.create({
        data: req.body,
      });
      
      if (!createGallery)
        throw apiResponse(status.FORBIDDEN, "Create new gallery failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new gallery success")
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
