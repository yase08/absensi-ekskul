import { Router } from "express";
import { RayonController } from "../controllers/rayon.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/rayon.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari RayonController agar bisa memakai semua property dan method dari rayon controller
class RayonRoutes extends RayonController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;}

  routes(): Router {
    this.router.post("/", this.createRayon);
    this.router.get("/", this.getAllRayon);
    this.router.put("/:id", this.updateRayon);
    this.router.delete("/:id", this.deleteRayon);

    return this.router;
  }
}

export default new RayonRoutes().routes();
