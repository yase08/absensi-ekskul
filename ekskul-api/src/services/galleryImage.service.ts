import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request, Response } from "express";
import { ExpressError } from "../helpers/error.helper";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { extensionSupport } from "../helpers/extension.helper";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class GalleryImageService {
  async createGalleryImageService(req: Request): Promise<any> {
    try {
      // let files: Express.Multer.File[] = req.files as Express.Multer.File[];
      const gallery = await db.gallery.findOne({
        where: { id: req.body.id },
      });

      if (!gallery) {
        return apiResponse(status.NOT_FOUND, "Gallery not found");
      }

      await db.galleryImage.bulkCreate(
        // imageUrls.map((url) => ({ galleryId: gallery.id, url: url }))
      );

      return apiResponse(status.OK, "Images uploaded successfully");
    } catch (error: any) {
      return apiResponse(
        error.statusCode || status.INTERNAL_SERVER_ERROR,
        error.statusMessage,
        error.message
      );
    }
  }
}
