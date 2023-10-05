import { Router } from "express";
import { AttendanceController } from "../controllers/attendance.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/attendance.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari AttendanceController agar bisa memakai semua property dan method dari attendance controller
class AttendanceRoutes extends AttendanceController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/", this.createAttendance);
    this.router.get("/", this.exportToExcel);

    return this.router;
  }
}

export default new AttendanceRoutes().routes();
