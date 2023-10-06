import { Router } from "express";
import { AttendanceInstructorController } from "../controllers/attendanceInstructor.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/attendance.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari AttendanceController agar bisa memakai semua property dan method dari attendance controller
class AttendanceInstructorRoutes extends AttendanceInstructorController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/", this.createAttendance);
    // this.router.get("/", this.exportToExcel);
    this.router.get("/", this.getAllAttendance);
    this.router.get("/:id", this.getOneAttendance);
    this.router.put("/:id", this.updateAttendance);

    return this.router;
  }
}

export default new AttendanceInstructorRoutes().routes();
