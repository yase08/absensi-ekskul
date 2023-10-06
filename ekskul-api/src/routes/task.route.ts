import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/rayon.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari TaskController agar bisa memakai semua property dan method dari rayon controller
class TaskRoutes extends TaskController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;}

  routes(): Router {
    this.router.post("/", this.createTask);
    this.router.get("/", this.getAllTask);
    this.router.get("/:id", this.getOneTask);
    this.router.put("/:id", this.updateTask);
    this.router.delete("/:id", this.deleteTask);

    return this.router;
  }
}

export default new TaskRoutes().routes();
