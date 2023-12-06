import { Router } from "express";
import { StudentController } from "../controllers/student.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTOStudent, DTOStudentById } from "../dto/student.dto";

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
      [authorization(), auth(), permission(["admin"]), validator(DTOStudent)],
      this.createStudent
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.getAllStudent
    );
    this.router.get(
      "/ekskul",
      [authorization(), auth(), permission(["admin", "instructor"])],
      this.getStudentByEkskul
    );
    this.router.put(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        validator(DTOStudent),
      ],
      this.updateStudent
    );
    this.router.delete(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        validator(DTOStudentById),
      ],
      this.deleteStudent
    );

    return this.router;
  }
}

export default new StudentRoutes().routes();
