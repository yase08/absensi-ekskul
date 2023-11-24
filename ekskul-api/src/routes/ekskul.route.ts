import { Router } from "express";
import { EkskulController } from "../controllers/ekskul.controller";
import { permission } from "../middlewares/permission";
import { auth } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTOEkskul, DTOEkskulById } from "../dto/ekskul.dto";

// class RouteUsers mengextends dari EkskulController agar bisa memakai semua property dan method dari ekskul controller
class EkskulRoutes extends EkskulController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["admin"]), validator(DTOEkskul)],
      this.createEkskul
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.getAllEkskul
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["admin"]), validator(DTOEkskul)],
      this.updateEkskul
    );
    this.router.delete(
      "/:id",
      [
        authorization(),
        auth(),
        permission(["admin"]),
        validator(DTOEkskulById),
      ],
      this.deleteEkskul
    );

    return this.router;
  }
}

export default new EkskulRoutes().routes();
