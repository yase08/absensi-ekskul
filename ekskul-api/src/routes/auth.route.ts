import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validator } from "../middlewares/validator.middleware";
import { DTOForgotPassword, DTOLogin, DTOResetToken } from "../dto/auth.dto";
import { authorization } from "../middlewares/authorization";
import { auth } from "../middlewares/authentication";
import { permission } from "../middlewares/permission";
import { upload } from "../libs/multer.lib";

// class RouteUsers mengextends dari AuthController agar bisa memakai semua property dan method dari auth controller
class AuthRoutes extends AuthController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/login", [validator(DTOLogin)], this.login);
    this.router.get(
      "/count",
      [authorization(), auth(), permission(["admin", "instructor"])],
      this.getCount
    );
    this.router.get("/refresh", this.refresh);
    this.router.get("/logout", this.logout);
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
    this.router.put(
      "/profile/update",
      [upload.single("image")],
      this.updateProfile
    );
    this.router.get(
      "/profile/:id",
      [authorization(), auth(), permission(["admin", "instructor"])],
      this.getProfile
    );

    return this.router;
  }
}

export default new AuthRoutes().routes();
