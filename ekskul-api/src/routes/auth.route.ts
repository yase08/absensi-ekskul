import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

// class RouteUsers mengextends dari AuthController agar bisa memakai semua property dan method dari auth controller
class AuthRoutes extends AuthController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/login", this.login);
    this.router.post(
      "/forgot-password",
      this.forgotPassword
    );
    this.router.put(
      "/reset-token/:token",
      this.resetToken
    );

    return this.router;
  }
}

export default new AuthRoutes().routes();
