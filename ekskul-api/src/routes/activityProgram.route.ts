import { permission } from "../middlewares/permission";
import { auth } from "../middlewares/authentication";
import { Router } from "express";
import { ActivityProgramController } from "../controllers/activityProgram.controller";
import { authorization } from "../middlewares/authorization";

// class RouteUsers mengextends dari ActivityProgramController agar bisa memakai semua property dan method dari activityProgram controller
class ActivityProgramRoutes extends ActivityProgramController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["instructor"])],
      this.createActivityProgram
    );

    return this.router;
  }
}

export default new ActivityProgramRoutes().routes();
