import { Router } from "express";
import { EkskulCategoryController } from "../controllers/ekskulCategory.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/ekskulCategory.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari EkskulCategoryController agar bisa memakai semua property dan method dari ekskulCategory controller
class EkskulCategoryRoutes extends EkskulCategoryController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/", this.createEkskulCategory);

    return this.router;
  }
}

export default new EkskulCategoryRoutes().routes();
