import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
// import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/auth.dto";
import { validator } from "../middlewares/validator.middleware";

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
      // [validator(DTOForgotPassword)],
      this.forgotPassword
    );
    this.router.put(
      "/reset-token/:token",
      // [validator(DTOResetToken)],
      this.resetToken
    );

    return this.router;
  }
}

export default new AuthRoutes().routes();
