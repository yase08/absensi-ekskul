import { Router } from "express";
import { ActivityController } from "../controllers/activity.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTOActivity, DTOActivityById } from "../dto/activity.dto";

// class RouteUsers mengextends dari ActivityController agar bisa memakai semua property dan method dari activity controller
class ActivityRoutes extends ActivityController {
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
        permission(["admin", "instructor"]),
        validator(DTOActivity),
      ],
      this.createActivity
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin", "instructor"])],
      this.getAllActivity
    );
    this.router.get("/", this.getAllActivity);
    this.router.put(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["admin", "instructor"]),
        validator(DTOActivity),
      ],
      this.updateActivity
    );
    this.router.delete(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["admin", "instructor"]),
        validator(DTOActivityById),
      ],
      this.deleteActivity
    );

    return this.router;
  }
}

export default new ActivityRoutes().routes();
