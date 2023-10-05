import { Router } from "express";
import { RoomController } from "../controllers/room.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/room.dto";
import { validator } from "../middlewares/validator.middleware";

// class RouteUsers mengextends dari RoomController agar bisa memakai semua property dan method dari room controller
class RoomRoutes extends RoomController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/", this.createRoom);
    this.router.get("/", this.getAllRoom);
    this.router.put("/:id", this.updateRoom);
    this.router.delete("/:id", this.deleteRoom);

    return this.router;
  }
}

export default new RoomRoutes().routes();
