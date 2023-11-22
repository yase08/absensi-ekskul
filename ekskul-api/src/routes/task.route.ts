import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { permission } from "../middlewares/permission";
import { auth } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTOTask, DTOTaskById } from "../dto/task.dto";

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
      [authorization(), auth(), permission(["instructor", "admin"]), validator(DTOTask)],
      this.createTask
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getAllTask
    );
    this.router.get(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        validator(DTOTaskById),
      ],
      this.getTask
    );
    this.router.put(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        validator(DTOTask),
      ],
      this.updateTask
    );
    this.router.delete(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["instructor", "admin"]),
        validator(DTOTaskById),
      ],
      this.deleteTask
    );

    return this.router;
  }
}

export default new TaskRoutes().routes();
