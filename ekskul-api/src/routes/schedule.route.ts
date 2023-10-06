import { Router } from "express";
import { ScheduleController } from "../controllers/schedule.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/schedule.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari ScheduleController agar bisa memakai semua property dan method dari schedule controller
class ScheduleRoutes extends ScheduleController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/", this.createSchedule);
    this.router.post("/activity", this.createActivityOnSchedule);
    this.router.get("/", this.getAllSchedule);
    this.router.get("/data", this.getSchedule);
    this.router.put("/:id", this.updateSchedule);
    this.router.delete("/:id", this.deleteSchedule);

    return this.router;
  }
}

export default new ScheduleRoutes().routes();
