import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/role.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari RoleController agar bisa memakai semua property dan method dari role controller
class RoleRoutes extends RoleController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/", this.createRole);

    return this.router;
  }
}

export default new RoleRoutes().routes();
