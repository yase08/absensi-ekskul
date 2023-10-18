import { Router } from "express";
import { RayonController } from "../controllers/rayon.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";

// class RouteUsers mengextends dari RayonController agar bisa memakai semua property dan method dari rayon controller
class RayonRoutes extends RayonController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.createRayon
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.getAllRayon
    );
    this.router.get(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"])],
      this.getRayon
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["admin"])],
      this.updateRayon
    );
    this.router.delete(
      "/:id",
      [authorization(), auth(), permission(["admin"])],
      this.deleteRayon
    );

    return this.router;
  }
}

export default new RayonRoutes().routes();
