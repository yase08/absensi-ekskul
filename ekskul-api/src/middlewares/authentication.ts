import { Handler, NextFunction, Request, Response } from "express";
import { OutgoingMessage } from "http";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../libs/jwt.lib";
import { StatusCodes as status } from "http-status-codes";

const db = require("../db/models");

// Middleware yang berfungsi handle autentikasi

export const auth = (): Handler => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<OutgoingMessage> {
    try {
      const accesstoken: string = (req.headers.authorization as string).split(
        "Bearer "
      )[1];
      const decoded: string | JwtPayload = (await verifyToken(
        accesstoken
      )) as JwtPayload;
      const user = await db.user.findOne({ where: { id: decoded.id } });
      const userOnEkskul = await db.userOnEkskul.findAll({
        where: { user_id: user.id },
      });
      const ekskulIds = userOnEkskul.map((userEkskul) => userEkskul.ekskul_id);
      req.session["user"] = {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
        ekskul: ekskulIds,
        isActive: user.isActive,
      };
      next();
    } catch (error: any) {
      return res.status(error.statusCode || status.UNAUTHORIZED).json({
        message: "Not Authorized, Please Login Again",
      });
    }
  };
};
