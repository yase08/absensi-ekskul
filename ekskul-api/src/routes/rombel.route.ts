import { Router } from "express";
import { RombelController } from "../controllers/rombel.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTORombel, DTORombelById } from "../dto/rombel.dto";


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
      [authorization(), auth(), permission(["admin"]), validator(DTORombel)],
      this.createRombel
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.getAllRombel
    );
    this.router.get(
      "/:id",
      [authorization(), auth(), permission(["instructor", "admin"]), validator(DTORombelById)],
      this.getRombel
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["admin"])],
      this.updateRombel
    );
    this.router.delete(
      "/:id",
      [authorization(), auth(), permission(["admin"])],
      this.deleteRombel
    );

    return this.router;
  }
}

export default new RombelRoutes().routes();
