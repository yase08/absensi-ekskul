import { Router } from "express";
import { RoomController } from "../controllers/room.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";
import { validator } from "../middlewares/validator.middleware";
import { DTORoom, DTORoomById } from "../dto/room.dto";


// class RouteUsers mengextends dari RoomController agar bisa memakai semua property dan method dari room controller
class RoomRoutes extends RoomController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["admin"]), validator(DTORoom)],
      this.createRoom
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin", "instructor"])],
      this.getAllRoom
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["admin"]), validator(DTORoom)],
      this.updateRoom
    );
    this.router.delete(
      "/:id",
      [authorization(), auth(), permission(["admin"]), validator(DTORoomById)],
      this.deleteRoom
    );

    return this.router;
  }
}

export default new RoomRoutes().routes();
