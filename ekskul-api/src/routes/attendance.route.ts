import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { Router } from "express";
import { AttendanceController } from "../controllers/attendance.controller";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTOAttendance, DTOAttendanceById } from "../dto/attendance.dto";

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
      [authorization(), auth(), permission(["instructor", "admin"]), 
      // validator(DTOAttendance)
    ],
      this.createAttendance
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getAllAttendance
    );
    this.router.get(
      "/chart",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getChartAttendance
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"]), 
      // validator(DTOAttendance)
    ],
      this.updateAttendance
    );

    return this.router;
  }
}

export default new AttendanceRoutes().routes();
