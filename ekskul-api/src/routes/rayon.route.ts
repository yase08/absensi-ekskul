import { Router } from "express";
import { RayonController } from "../controllers/rayon.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTORayon, DTORayonById } from "../dto/rayon.dto";

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
      [authorization(), auth(), permission(["admin"]), validator(DTORayon)],
      this.createRayon
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin","instructor"])],
      this.getAllRayon
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["admin"]), validator(DTORayon)],
      this.updateRayon
    );
    this.router.delete(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["admin"]),
        validator(DTORayonById),
      ],
      this.deleteRayon
    );

    return this.router;
  }
}

export default new RayonRoutes().routes();
