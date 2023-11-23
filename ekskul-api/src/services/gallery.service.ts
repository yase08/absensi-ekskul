import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import slugify from "slugify";
import { Op } from "sequelize";
import path from "path";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

export class GalleryService {
  async createGalleryService(req: Request): Promise<any> {
    try {
      const ekskulOnGallery = await db.gallery.findOne({
        where: { ekskul_id: req.body.ekskul_id },
      });

      if (ekskulOnGallery)
        throw apiResponse(
          status.CONFLICT,
          `Ekskul id ${req.body.ekskul_id} pada galeri sudah ada`
        );

      if (req.body.name) {
        req.body.slug = slugify(req.body.name.toLowerCase());
      }

      let files: Express.Multer.File[] = req.files as Express.Multer.File[];
      let galleryImages: string[] = [];

      for (let i in files) {
        const file = files[i];
        const pathName = file.path;
        galleryImages.push(pathName);
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
      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const filter: string =
        typeof req.query.filter === "string" ? req.query.filter : "";
      const page: any = req.query.page;

      const paramQuerySQL: any = {};
      let limit: number;
      let offset: number;

      const totalRows = await db.gallery.count();

      if (filter) {
        paramQuerySQL.where = {
          name: {
            [Op.like]: `%${filter}%`,
          },
        };
      }

      paramQuerySQL.include = [
        {
          model: db.ekskul,
          as: "ekskul",
          attributes: ["name"],
        },
      ];

      if (sort) {
        const sortOrder = sort.startsWith("-") ? "DESC" : "ASC";
        const fieldName = sort.replace(/^-/, "");
        paramQuerySQL.order = [[fieldName, sortOrder]];
      }

      if (page && page.size && page.number) {
        limit = parseInt(page.size, 10);
        offset = (parseInt(page.number, 10) - 1) * limit;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      } else {
        limit = 10;
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }

      const gallery = await db.gallery.findAll(paramQuerySQL);

      if (!gallery || gallery.length === 0)
        throw apiResponse(status.NOT_FOUND, "Galeri tidak ditemukan");

      const manipulatedGallery = gallery.map((item) => {
        return {
          id: item.id,
          name: item.name,
          slug: item.slug,
          ekskul: item.ekskul ? item.ekskul.name : null,
          images: JSON.parse(item.images),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Berhasil mendapatkan semua galeri",
          manipulatedGallery,
          totalRows
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
      const galleries = await db.gallery.findAll({
        where: { slug: req.params.slug },
        include: [
          {
            model: db.ekskul,
            as: "ekskul",
            attributes: ["name"],
          },
        ],
      });

      const manipulatedGallery = galleries.map((item) => {
        return {
          id: item.id,
          name: item.name,
          slug: item.slug,
          ekskul: item.ekskul ? item.ekskul.name : null,
          images: JSON.parse(item.images),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });

      if (!galleries)
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

      let files: Express.Multer.File[] = req.files as Express.Multer.File[];
      let galleryImages: string[] = [...galleryExist.images];

      for (let i in files) {
        const file = files[i];
        const pathName = file.path;
        galleryImages.push(pathName);
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
