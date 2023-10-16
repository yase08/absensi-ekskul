import { Router } from "express";
import { InstructorAttendanceController } from "../controllers/instructorAttendance.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { checkInstructorPermission } from "../middlewares/instructorPermission";
import { authorization } from "../middlewares/authorization";

// class RouteUsers mengextends dari InstructorAttendanceController agar bisa memakai semua property dan method dari instructorAttendance controller
class InstructorAttendanceRoutes extends InstructorAttendanceController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["instructor"])],
      checkInstructorPermission,
      this.createInstructorAttendance
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin"])],

      this.getAllInstructorAttendance
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["admin"])],

      this.updateInstructorAttendance
    );

    return this.router;
  }
}

export default new InstructorAttendanceRoutes().routes();
