import { Router } from "express";
import { AssessmentController } from "../controllers/assessment.controller";
import { permission } from "../middlewares/permission";
import { auth } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTOAsessmentById, DTOAssessmentArray } from "../dto/assessment.dto";

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
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        // validator(DTOAssessmentArray),
      ],
      this.createAssessment
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getAllAssessment
    );
    this.router.put(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        validator(DTOAsessmentById),
      ],
      this.updateAssessment
    );
    this.router.delete(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        validator(DTOAsessmentById),
      ],
      this.deleteAssessment
    );

    return this.router;
  }
}

export default new AssessmentRoutes().routes();
