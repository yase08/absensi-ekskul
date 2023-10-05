import { Router } from "express";
import { RombelController } from "../controllers/rombel.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/rombel.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari RombelController agar bisa memakai semua property dan method dari rombel controller
class RombelRoutes extends RombelController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/", this.createRombel);
    this.router.get("/", this.getAllRombel);
    this.router.put("/:id", this.updateRombel);
    this.router.delete("/:id", this.deleteRombel);

    return this.router;
  }
}

export default new RombelRoutes().routes();
