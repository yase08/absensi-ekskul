import { Router } from "express";
import { EkskulController } from "../controllers/ekskul.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/ekskul.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari EkskulController agar bisa memakai semua property dan method dari ekskul controller
class EkskulRoutes extends EkskulController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/", this.createEkskul);

    return this.router;
  }
}

export default new EkskulRoutes().routes();
