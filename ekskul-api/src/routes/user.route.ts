import { Router } from "express";
import { UserController } from "../controllers/user.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/student.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari StudentController agar bisa memakai semua property dan method dari student controller
class UserRoutes extends UserController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/", this.createUser);
    this.router.get("/", this.getAllUser);

    return this.router;
  }
}

export default new UserRoutes().routes();
