import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { comparePassword, hashPassword } from "../libs/bcrypt.lib";
import jwt from "jsonwebtoken";
import { createPasswordResetToken, hashToken } from "../libs/crypto.libs";
import { sendMailer } from "../libs/nodemailer.lib";
import { PrismaClient } from "@prisma/client";

// Berfungsi untuk menghandle logic dari controler

const jwtSecret = process.env.SECRET_KEY as string;
const prisma = new PrismaClient();

export class AuthService {
  async loginService(req: Request): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      if (!user)
        throw apiResponse(status.BAD_REQUEST, "Email is not registered");

      const hashedPassword = await comparePassword(
        user.password,
        req.body.password
      );

      if (!hashedPassword)
        throw apiResponse(status.BAD_REQUEST, "Incorect email or password");

      const token = jwt.sign(
        {
          id: user.id,
          email: req.body.email,
          name: user.name,
          image: user.image,
        },
        jwtSecret,
        { expiresIn: "1d" }
      );

      return Promise.resolve(
        apiResponse(status.OK, "Login success", token, undefined)
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async forgotPasswordService(req: Request): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: req.body.email },
      });
      if (!user) {
        throw apiResponse(status.BAD_REQUEST, "Email is not registered");
      }

      const { resetToken, passwordResetToken, passwordResetExpires } =
        await createPasswordResetToken();

      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: passwordResetToken,
          passwordResetExpires: passwordResetExpires,
        },
      });

      const resetLink = `http://localhost:8000/api/v1/auth/reset-token/${resetToken}`;

      const data = {
        to: req.body.email,
        subject: "Forgot Password",
        html: resetLink,
      };

      sendMailer(data.to, data.subject, data.html);

      return Promise.resolve(
        apiResponse(status.OK, "Reset link has been sent to your email", data)
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async resetTokenService(req: Request): Promise<any> {
    try {
      const hashedToken = await hashToken(req.params.token);

      const user = await prisma.user.findFirst({
        where: {
          passwordResetToken: hashedToken,
          passwordResetExpires: { gt: Date.now() },
        },
      });

      if (!user) {
        apiResponse(status.BAD_REQUEST, "Token expired, please try again");
      }

      const updateHashedPassword = await hashPassword(req.body.password);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: updateHashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
        },
      });

      return Promise.resolve(
        apiResponse(status.OK, "Successfully changed password")
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }
}
