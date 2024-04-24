import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import slugify from "slugify";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class GalleryService {
  async createGalleryService(req: Request): Promise<any> {
    try {
      if (req.body.name) {
        req.body.slug = slugify(req.body.name.toLowerCase());
      }

      let files: Express.Multer.File[] = req.files as Express.Multer.File[];
      let galleryImages: string[] = [];

      for (let i in files) {
        const file = files[i];
        const fileName = file.filename;
        galleryImages.push(fileName);
      }

      const createGallery = await db.gallery.create({
        ...req.body,
        images: galleryImages,
      });

      if (!createGallery)
        throw apiResponse(status.FORBIDDEN, "Gagal membuat galeri");

      return Promise.resolve(apiResponse(status.OK, "Galeri berhasil dibuat"));
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

  async getAllGalleryService(req: Request): Promise<any> {
    try {
      const paramQuerySQL: any = {};

      paramQuerySQL.include = [
        {
          model: db.ekskul,
          as: "ekskul",
          attributes: ["id", "name"],
        },
      ];

      const gallery = await db.gallery.findAll(paramQuerySQL);

      if (!gallery || gallery.length === 0)
        throw apiResponse(status.NOT_FOUND, "Galeri tidak ditemukan");

      const manipulatedGallery = gallery.map((item) => {
        return {
          id: item.id,
          name: item.name,
          slug: item.slug,
          ekskul: item.ekskul
            ? {
                id: item.ekskul.id,
                name: item.ekskul.name,
              }
            : null,
          date: item.date,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan semua galeri",
          manipulatedGallery
        )
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

  async getDetailGalleryService(req: Request): Promise<any> {
    try {
      const gallery = await db.gallery.findAll({
        where: { slug: req.params.slug },
        attributes: ["images"],
      });

      if (!gallery || gallery.length === 0)
        throw apiResponse(status.NOT_FOUND, "Galeri tidak ditemukan");

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil mendapatkan semua galeri", gallery)
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

  async getGalleryDetailService(req: Request): Promise<any> {
    try {
      const gallery = await db.gallery.findOne({
        where: { slug: req.params.slug },
        include: [
          {
            model: db.ekskul,
            as: "ekskul",
            attributes: ["id", "name"],
          },
        ],
      });

      const manipulatedGallery = {
        id: gallery.id,
        name: gallery.name,
        slug: gallery.slug,
        ekskul: gallery.ekskul
          ? {
              id: gallery.ekskul.id,
              name: gallery.ekskul.name,
            }
          : null,
        images: JSON.parse(gallery.images),
        createdAt: gallery.createdAt,
        updatedAt: gallery.updatedAt,
      };

      if (!gallery)
        throw apiResponse(status.NOT_FOUND, "Galeri tidak ditemukan");

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan galeri",
          manipulatedGallery
        )
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

  async getGalleryService(req: Request): Promise<any> {
    try {
      const galleries = await db.gallery.findAll();

      if (!galleries || galleries.length === 0)
        throw apiResponse(status.NOT_FOUND, "Galeri tidak ditemukan");

      const manipulatedGallery = galleries.map((item) => {
        return {
          id: item.id,
          name: item.name,
          slug: item.slug,
          images: JSON.parse(item.images),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan galeri",
          manipulatedGallery
        )
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

      if (req.body.name) {
        req.body.slug = slugify(req.body.name.toLowerCase());
      }

      if (!galleryExist)
        throw apiResponse(status.NOT_FOUND, "Galeri tidak ditemukan");

      const files: Express.Multer.File[] = req.files as Express.Multer.File[];
      const galleryImages: string[] = Array.isArray(galleryExist.images)
        ? [...galleryExist.images]
        : [];

      // Add new images to the galleryImages array
      for (const file of files) {
        const pathName = file.filename;
        galleryImages.push(pathName);
      }

      // Remove deleted images from the galleryImages array and delete them from the server
      const imagesToDelete = Array.isArray(galleryExist.images)
        ? galleryExist.images.filter((image) => !galleryImages.includes(image))
        : [];

      for (const imageToDelete of imagesToDelete) {
        const imagePath = path.join(
          __dirname,
          "..",
          "public",
          "images",
          imageToDelete
        );

        // Check if the file exists before attempting to delete it
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      const updateGallery = await db.gallery.update(
        {
          ...req.body,
          images: galleryImages,
        },
        {
          where: {
            id: galleryExist.id,
          },
        }
      );

      if (!updateGallery)
        throw apiResponse(status.FORBIDDEN, "Update galeri gagal");

      return Promise.resolve(apiResponse(status.OK, "Update galeri berhasil"));
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
        throw apiResponse(status.NOT_FOUND, "Galeri tidak ditemukan");

      let deleteImages: string[] = [];

      if (typeof galleryExist.images === "string") {
        // Jika galleryExist.images berupa string JSON, parse ke dalam bentuk array
        deleteImages = JSON.parse(galleryExist.images);
      } else if (Array.isArray(galleryExist.images)) {
        // Jika galleryExist.images sudah berupa array
        deleteImages = galleryExist.images;
      }

      for (let i in deleteImages) {
        const filePath = path.join(
          __dirname,
          "..",
          "public",
          "images",
          deleteImages[i]
        );

        fs.unlinkSync(filePath);
      }

      await db.gallery.destroy({
        where: { id: galleryExist.id },
      });

      return Promise.resolve(
        apiResponse(status.OK, "Berhasil menghapus galeri")
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
