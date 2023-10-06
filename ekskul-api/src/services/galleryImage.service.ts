import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
const { v4: uuidv4 } = require("uuid");

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models/index.js");

export class GalleryImageService {
  async createGalleryImageService(req: Request): Promise<any> {
    try {
      // let files: Express.Multer.File[] = req.files as Express.Multer.File[];
      const id = 1;
      const gallery = await db.gallery.findOne({
        where: { id: id },
      });

      if (!gallery) {
        return apiResponse(status.NOT_FOUND, "Gallery not found");
      }

      // const storage = multer.diskStorage({
      //   destination: (req, file, cb) => {
      //     const folder = path.join(
      //       __dirname,
      //       `../public/gallery`
      //     );
      //     if (fs.existsSync(folder)) {
      //       cb(null, folder);
      //     } else {
      //       fs.mkdirSync(folder, { recursive: true });
      //       cb(null, folder);
      //     }
      //   },
      //   filename: (req, file, callBack) => {
      //     callBack(null, `${gallery.slug}`);
      //   },
      // });

      // const fileFilter = (req: any, file: any, cb: any) => {
      //   const fileTypes = ["image/jpeg", "image/png"];
      //   if (fileTypes.includes(file.mimetype)) {
      //     cb(null, true);
      //   } else {
      //     cb(new Error("Invalid file type"), false);
      //   }
      // };

      // const uploadPhoto = multer({
      //   storage: storage,
      //   limits: { fileSize: 50000000 },
      //   fileFilter,
      // }).array("images", 5);

      // uploadPhoto(req, res, async (err: any) => {
      //   if (err) {
      //     throw apiResponse(
      //       err.statusCode || status.INTERNAL_SERVER_ERROR,
      //       err.statusMessage,
      //       err.message
      //     );
      // } else {

      // for (let i in files) {
      //   if (process.platform !== 'win32') directory = `../public/${files[i].filename}`
      //   else directory = `${process.env.TEMP}/${files[i].filename}`

      //   if (fs.existsSync(directory)) {
      //     const res: UploadApiResponse = await cloudinaryStorage(directory)
      //     bookImages.push(res.secure_url)
      //   }
      // }

      const images = req.files as Express.Multer.File[];
      console.log(images);

      const imageUrls = images.map((file) => {
        const imageUrl = `/gallery/${gallery.slug}/${file.filename}`;
        return imageUrl;
      });

      await db.galleryImage.bulkCreate(
        imageUrls.map((url) => ({ galleryId: gallery.id, url: url }))
      );

      return apiResponse(status.OK, "Images uploaded successfully");
      // }
      // });
    } catch (error: any) {
      return apiResponse(
        error.statusCode || status.INTERNAL_SERVER_ERROR,
        error.statusMessage,
        error.message
      );
    }
  }
}
