import { permission } from "../middlewares/permission";
import { auth } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";
import { Router } from "express";
import { ActivityProgramController } from "../controllers/activityProgram.controller";
import { validator } from "../middlewares/validator.middleware";
import {
  DTOActivityProgram,
  DTOActivityProgramById,
} from "../dto/activityProgram.dto";

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
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        validator(DTOActivityProgram),
      ],
      this.createActivityProgram
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getAllActivityProgram
    );
    this.router.put(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        validator(DTOActivityProgram),
      ],
      this.updateActivityProgram
    );
    this.router.delete(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        validator(DTOActivityProgramById),
      ],
      this.deleteActivityProgram
    );
    this.router.get(
      "/export",
      [authorization(), auth(), permission(["admin", "instructor"])],
      this.exportToExcel
    );
    this.router.get(
      "/export",
      [authorization(), auth(), permission(["admin", "instructor"])],
      this.exportAllToExcel
    );

    return this.router;
  }
}

export default new ActivityProgramRoutes().routes();
