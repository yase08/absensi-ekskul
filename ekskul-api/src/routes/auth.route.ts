import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validator } from "../middlewares/validator.middleware";
import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/auth.dto";
import { authorization } from "../middlewares/authorization";
import { auth } from "../middlewares/authentication";

// class RouteUsers mengextends dari AuthController agar bisa memakai semua property dan method dari auth controller
class AuthRoutes extends AuthController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/login", [validator(DTOLogin)], this.login);
    this.router.get("/count", [authorization(), auth()], this.getCount);
    this.router.post("/logout", [authorization(), auth()], this.logout);
    this.router.post(
      "/forgot-password",
      [validator(DTOForgotPassword)],
      this.forgotPassword
    );
    this.router.put(
      "/reset-token/:token",
      [validator(DTOResetToken)],
      this.resetToken
    );

    return this.router;
  }
}

export default new AuthRoutes().routes();
