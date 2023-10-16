import { Router } from "express";
import { GalleryController } from "../controllers/gallery.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/gallery.dto";
import { validator } from "../middlewares/validator.middleware";
import { authorization } from "../middlewares/authorization";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";

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
      // [authorization(), auth(), permission(["admin"])],
      this.createGallery
    );

    return this.router;
  }
}

export default new GalleryRoutes().routes();
