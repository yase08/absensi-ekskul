import { Router } from "express";
import { AssessmentController } from "../controllers/assessment.controller";
import { permission } from "../middlewares/permission";
import { auth } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";

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
      [authorization(), auth(), permission(["instructor"])],
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
      [authorization(), auth(), permission(["instructor", "admin"])],
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
