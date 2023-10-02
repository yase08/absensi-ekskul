import { Router } from "express";
import { ActivityProgramController } from "../controllers/activityProgram.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/activityProgram.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari ActivityProgramController agar bisa memakai semua property dan method dari activityProgram controller
class ActivityProgramRoutes extends ActivityProgramController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;}

  routes(): Router {
    this.router.post("/", this.createActivityProgram);

    return this.router;
  }
}

export default new ActivityProgramRoutes().routes();
