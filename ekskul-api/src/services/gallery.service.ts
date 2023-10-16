import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import fs from "fs";
import path from "path";
import slugify from "slugify";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class GalleryService {
  async createGalleryService(req: Request): Promise<any> {
    try {
      const gallery = await db.gallery.findOne({ where: { name: req.body.name } });

      if (gallery)
        throw apiResponse(
          status.CONFLICT,
          `Gallery ${req.body.name} already exist`
        );

      if (req.body.name) {
        req.body.slug = slugify(req.body.name.toLowerCase());
      }
      const createGallery = await db.gallery.create(req.body);

      if (!createGallery)
        throw apiResponse(status.FORBIDDEN, "Create new gallery failed");

      const folderName = path.join(__dirname, `../public/gallery/${req.body.slug}`);
      console.log(folderName);

      // Mengecek apakah direktori parent sudah ada
      const parentFolderName = path.dirname(folderName);
      if (!fs.existsSync(parentFolderName)) {
        fs.mkdirSync(parentFolderName, { recursive: true });
      }

      // Membuat folder yang diinginkan
      if (fs.existsSync(folderName)) {
        console.log("Folder already exists", folderName);
      } else {
        fs.mkdirSync(folderName);
        console.log("Folder created");
      }

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

  async updateGalleryService(req: Request): Promise<any> {
    try {
      const galleryExist = await db.gallery.findOne({
        where: { id: req.params.id },
      });

      if (!galleryExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Gallery do not exist for the given id"
        );

      const updateGallery = await db.gallery.update(req.body);

      if (!updateGallery)
        throw apiResponse(status.FORBIDDEN, "Update gallery failed");

      return Promise.resolve(apiResponse(status.OK, "Update gallery success"));
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

  async deleteGalleryService(req: Request): Promise<any> {
    try {
      const galleryExist = await db.gallery.findOne({
        where: { id: req.params.id },
      });

      if (!galleryExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Gallery do not exist for the given id"
        );

      const deleteGallery = await db.gallery.destroy({
        where: { id: galleryExist.id },
      });

      if (!deleteGallery)
        throw apiResponse(status.FORBIDDEN, "Delete gallery failed");

      return Promise.resolve(apiResponse(status.OK, "Delete gallery success"));
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
