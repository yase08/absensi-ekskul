import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { Router } from "express";
import { AttendanceController } from "../controllers/attendance.controller";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTOAttendanceArray, DTOAttendanceById } from "../dto/attendance.dto";

// class RouteUsers mengextends dari AttendanceController agar bisa memakai semua property dan method dari attendance controller
class AttendanceRoutes extends AttendanceController {
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
        validator(DTOAttendanceArray),
      ],
      this.createAttendance
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getAllAttendance
    );
    this.router.get(
      "/charts/weekly",
      [authorization(), auth(), permission(["admin"])],
      this.getWeeklyAttendanceChart
    );
    this.router.get(
      "/export",
      [authorization(), auth(), permission(["admin", "instructor"])],
      this.exportToExcel
    );
    this.router.put(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        validator(DTOAttendance),
      ],
      this.updateAttendance
    );

    return this.router;
  }
}

export default new AttendanceRoutes().routes();
