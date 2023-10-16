import { Router } from "express";
import { RoomController } from "../controllers/room.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";

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
      [authorization(), auth(), permission(["admin"])],
      this.createRoom
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.getAllRoom
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["admin"])],
      this.updateRoom
    );
    this.router.delete(
      "/:id",
      [authorization(), auth(), permission(["admin"])],
      this.deleteRoom
    );

    return this.router;
  }
}

export default new RoomRoutes().routes();
