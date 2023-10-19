import { Router } from "express";
import { AssessmentController } from "../controllers/assessment.controller";
import { permission } from "../middlewares/permission";
import { auth } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTOAssessment, DTOAssessmentById } from "../dto/assessment.dto";


// class RouteUsers mengextends dari AssessmentController agar bisa memakai semua property dan method dari rayon controller
class AssessmentRoutes extends AssessmentController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["instructor"]), validator(DTOAssessment)],
      this.createAssessment
    );
    this.router.get(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getAllAssessment
    );
    this.router.get(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getAssessment
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"]), validator(DTOAssessmentById)],
      this.updateAssessment
    );
    this.router.delete(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.deleteAssessment
    );

    return this.router;
  }
}

export default new AssessmentRoutes().routes();
