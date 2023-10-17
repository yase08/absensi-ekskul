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
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.createActivityProgram
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getAllActivityProgramService
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.updateActivityProgramService
    );
    this.router.delete(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.deleteActivityProgramService
    );

    return this.router;
  }
}

export default new ActivityProgramRoutes().routes();
