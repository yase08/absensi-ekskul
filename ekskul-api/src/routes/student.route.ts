import { Router } from "express";
import { StudentController } from "../controllers/student.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/student.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari StudentController agar bisa memakai semua property dan method dari student controller
class StudentRoutes extends StudentController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/", this.createStudent);

    return this.router;
  }
}

export default new StudentRoutes().routes();
