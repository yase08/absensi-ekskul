import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import slugify from "slugify";
import { ExpressError } from "../helpers/error.helper";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { extensionSupport } from "../helpers/extension.helper";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class GalleryService {
  async createGalleryService(req: Request): Promise<any> {
    try {
      const gallery = await db.gallery.findOne({
        where: { name: req.body.name },
      });

      if (gallery)
        throw apiResponse(
          status.CONFLICT,
          `Gallery ${req.body.name} already exist`
        );

      if (req.body.name) {
        req.body.slug = slugify(req.body.name.toLowerCase());
      }

      const folderName = path.join(
        __dirname,
        `../public/gallery/${req.body.slug}`
      );
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

      const storage = multer.diskStorage({
        destination: (_: Request, file: Express.Multer.File, done: any) => {
          const folder = path.join(
            __dirname,
            `../public/gallery/${req.body.slug}`
          );

          if (!file) {
            done(new ExpressError("Uploading file failed"), null);
          } else {
            if (fs.existsSync(folder)) {
              done(null, folder);
            } else {
              done(new ExpressError("No such file directory").message, null);
            }
          }
        },
        filename: (_req: Request, file: Express.Multer.File, done: any) => {
          if (!file) done(new ExpressError("Get file upload failed"), null);
          done(null, `${Date.now()}_${file.originalname}`);
        },
      });

      const fileFilter = (
        _req: Request,
        file: Express.Multer.File,
        done: FileFilterCallback
      ) => {
        if (!extensionSupport(file.mimetype) || !file) {
          throw Promise.reject(new ExpressError("File format not supported"));
        }
        done(null, true);
      };

      const uploadPhoto = multer({
        storage: storage,
        limits: { fileSize: 2000000 },
        fileFilter,
      }).array("images");

      let files: Express.Multer.File[] = req.files as Express.Multer.File[];
      let bookImages: string[] = [];

      for (let i in files) {
        const file = files[i];
        const fileName = file.filename;
        bookImages.push(fileName);
      }

      const createGallery = await db.gallery.create({
        ...req.body,
        ekskul_id: 1,
        images: bookImages,
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
