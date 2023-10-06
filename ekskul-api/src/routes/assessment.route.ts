import { Router } from "express";
import { AssessmentController } from "../controllers/assessment.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/rayon.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari AssessmentController agar bisa memakai semua property dan method dari rayon controller
class AssessmentRoutes extends AssessmentController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;}

  routes(): Router {
    this.router.post("/", this.createAssessment);
    this.router.get("/:id", this.getAllAssessment);
    this.router.get("/:id", this.getOneAssessment);
    this.router.put("/:id", this.updateAssessment);
    this.router.delete("/:id", this.deleteAssessment);

    return this.router;
  }
}

export default new AssessmentRoutes().routes();
