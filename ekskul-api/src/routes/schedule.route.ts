import { Router } from "express";
import { ScheduleController } from "../controllers/schedule.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";

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
      [authorization(), auth(), permission(["admin"])],
      this.createSchedule
    );
    this.router.post(
      "/activity",
      auth,
      permission(["admin"]),
      this.createActivityOnSchedule
    );
    this.router.put(
      "/activity/:id",
      [authorization(), auth(), permission(["admin"])],
      this.updateActivityOnSchedule
    );
    this.router.delete(
      "/activity/:id",
      [authorization(), auth(), permission(["admin"])],
      this.deleteActivityOnSchedule
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.getAllSchedule
    );
    this.router.get("/data", this.getSchedule);

    return this.router;
  }
}

export default new ScheduleRoutes().routes();
