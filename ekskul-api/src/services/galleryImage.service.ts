import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class GalleryImageService {
  async createGalleryImageService(req: Request): Promise<any> {
    try {
      const images = req.files["url"];

      if (!images || images.length === 0) {
        throw apiResponse(status.NOT_FOUND, "No image provides");
      }

      const gallery = await db.gallery.findOne({
        where: { slug: req.body.slug },
      });

      if (!gallery) {
        throw apiResponse(status.FORBIDDEN, "Gallery not found");
      }

      const galleryImages = [];

      for (const image of images) {
        const galleryImage = await db.galleryImage.create({
          url: image.filename,
        });

        galleryImages.push(galleryImage);
      }

      await gallery.addGalleryImages(galleryImages);

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
