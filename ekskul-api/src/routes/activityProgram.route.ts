import { permission } from "../middlewares/permission";
import { auth } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";
import { Router } from "express";
import { ActivityProgramController } from "../controllers/activityProgram.controller";

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
      this.getAllActivityProgram
    );
    this.router.get(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getActivityProgram
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.updateActivityProgram
    );
    this.router.delete(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.deleteActivityProgram
    );

    return this.router;
  }
}

export default new ActivityProgramRoutes().routes();
