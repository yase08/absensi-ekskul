import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { permission } from "../middlewares/permission";
import { auth } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";

// class RouteUsers mengextends dari TaskController agar bisa memakai semua property dan method dari rayon controller
class TaskRoutes extends TaskController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["instructor"])],
      this.createTask
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getAllTask
    );
    this.router.get(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getTask
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.updateTask
    );
    this.router.delete(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.deleteTask
    );

    return this.router;
  }
}

export default new TaskRoutes().routes();
