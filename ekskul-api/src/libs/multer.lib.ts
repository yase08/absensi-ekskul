import { ExpressError } from "../helpers/error.helper";
import multer, { FileFilterCallback } from "multer";
import { extensionSupport } from "../helpers/extension.helper";
import path from "path";
import fs from "fs";
import { Request } from "express";

export const upload = multer({
  storage: multer.diskStorage({
    destination(_: Request, file: Express.Multer.File, done: any) {
      const folder: string = path.join(__dirname, `../public/images`);

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
    filename(_req: Request, file: Express.Multer.File, done: any) {
      if (!file) done(new ExpressError("Get file upload failed"), null);
      done(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter(
    _req: Request,
    file: Express.Multer.File,
    done: FileFilterCallback
  ) {
    if (!extensionSupport(file.mimetype) || !file) {
      throw Promise.reject(new ExpressError("File format not supported"));
    }
    done(null, true);
  },
  limits: { fileSize: 2000000 },
}) as multer.Multer;

export const uploadExcel = multer({
  storage: multer.diskStorage({
    destination(_: Request, file: Express.Multer.File, done: any) {
      const folder: string = path.join(__dirname, `../public/import`);

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
    filename(_req: Request, file: Express.Multer.File, done: any) {
      if (!file) done(new ExpressError("Get file upload failed"), null);
      done(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter(
    _req: Request,
    file: Express.Multer.File,
    done: FileFilterCallback
  ) {
    if (!extensionSupport(file.mimetype) || !file) {
      throw Promise.reject(new ExpressError("File format not supported"));
    }
    done(null, true);
  },
  limits: { fileSize: 2000000 },
}) as multer.Multer;
