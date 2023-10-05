import { Router } from "express";
import { GalleryImageController } from "../controllers/galleryImage.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/galleryImage.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari GalleryImageController agar bisa memakai semua property dan method dari galleryImage controller
class GalleryImageRoutes extends GalleryImageController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;}

  routes(): Router {
    this.router.post("/", this.createGalleryImage);

    return this.router;
  }
}

export default new GalleryImageRoutes().routes();
