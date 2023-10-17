import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { authorization } from "../middlewares/authorization";

// class RouteUsers mengextends dari UserController agar bisa memakai semua property dan method dari user controller
class UserRoutes extends UserController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.createUser
    );
    this.router.get(
      "/",
      [authorization(), auth(), permission(["admin"])],
      this.getAllUser
    );
    this.router.put(
      "/:id",
      [authorization(), auth(), permission(["admin"])],
      this.updateUser
    );
    this.router.delete(
      "/:id",
      [authorization(), auth(), permission(["admin"])],
      this.deleteUser
    );

    return this.router;
  }
}

export default new UserRoutes().routes();
