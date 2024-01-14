import { Router } from "express";
import { GalleryController } from "../controllers/gallery.controller";
import { authorization } from "../middlewares/authorization";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { upload } from "../libs/multer.lib";
import { validator } from "../middlewares/validator.middleware";
import { DTOGallery, DTOGalleryById } from "../dto/gallery.dto";

// class RouteUsers mengextends dari GalleryController agar bisa memakai semua property dan method dari gallery controller
class GalleryRoutes extends GalleryController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["admin"]), upload.array("images")],
      this.createGallery
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.getAllGallery
    );
    this.router.get(
      "/detail/:slug",
      [authorization(), auth(), permission(["admin"])],
      this.getDetailGallery
    );
    this.router.get("/:slug", this.getGallery);
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["admin"]), upload.array("images")],
      this.updateGallery
    );
    this.router.delete(
      "/:id",
      [authorization(), auth(), permission(["admin"])],
      this.deleteGallery
    );

    return this.router;
  }
}

export default new GalleryRoutes().routes();
