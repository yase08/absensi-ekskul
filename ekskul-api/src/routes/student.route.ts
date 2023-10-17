import { Router } from "express";
import { StudentController } from "../controllers/student.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";

// class RouteUsers mengextends dari StudentController agar bisa memakai semua property dan method dari student controller
class StudentRoutes extends StudentController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.createStudent
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.getAllStudent
    );

    return this.router;
  }
}

export default new StudentRoutes().routes();
