import { Router } from "express";
import { ScheduleController } from "../controllers/schedule.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTOActivity, DTOActivityById, DTOSchedule } from "../dto/schedule.dto";

// class RouteUsers mengextends dari ScheduleController agar bisa memakai semua property dan method dari schedule controller
class ScheduleRoutes extends ScheduleController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["admin", "instructor"]), validator(DTOSchedule)],
      this.createSchedule
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["admin"]), validator(DTOSchedule)],
      this.updateSchedule
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.getAllSchedule
    );
    this.router.get(
      "/day",
      [authorization(), auth(), permission(["admin", "instructor"])],
      this.getAllDay
    );
    this.router.get("/ekskul", this.getSchedule);

    return this.router;
  }
}

export default new ScheduleRoutes().routes();
