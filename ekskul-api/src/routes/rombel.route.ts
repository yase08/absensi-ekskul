import { Router } from "express";
import { RombelController } from "../controllers/rombel.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";

// class RouteUsers mengextends dari RombelController agar bisa memakai semua property dan method dari rombel controller
class RombelRoutes extends RombelController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["instructor"])],
      this.createRombel
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["instructor"])],
      this.getAllRombel
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["instructor"])],
      this.updateRombel
    );
    this.router.delete(
      "/:id",
      [authorization(), auth(), permission(["instructor"])],
      this.deleteRombel
    );

    return this.router;
  }
}

export default new RombelRoutes().routes();
