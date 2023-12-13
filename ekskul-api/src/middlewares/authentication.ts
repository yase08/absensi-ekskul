import { Handler, NextFunction, Request, Response } from "express";
import { OutgoingMessage } from "http";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../libs/jwt.lib";
import { StatusCodes as status } from "http-status-codes";

const db = require("../db/models");

export const auth = (): Handler => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<OutgoingMessage> {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        return res.status(status.UNAUTHORIZED).json({
          message: "Authorization header is missing.",
        });
      }

      const token = authorizationHeader.split("Bearer ")[1];

      if (!token) {
        return res.status(status.UNAUTHORIZED).json({
          message: "Invalid token format.",
        });
      }

      const decoded: string | JwtPayload = (await verifyToken(
        token
      )) as JwtPayload;
      // const user = await db.user.findOne({ where: { id: decoded.id } });

      // if (!user) {
      //   return res.status(status.UNAUTHORIZED).json({
      //     message: "User not found.",
      //   });
      // }

      // const userOnEkskul = await db.userOnEkskul.findAll({
      //   where: { user_id: user.id },
      // });

      // const ekskulIds = userOnEkskul.map((userEkskul) => userEkskul.ekskul_id);

      // req.session["user"] = {
      //   id: user.id,
      //   email: user.email,
      //   name: user.name,
      //   image: user.image,
      //   role: user.role,
      //   ekskul: ekskulIds,
      //   isActive: user.isActive,
      // };

      next();
    } catch (error: any) {
      return res.status(error.statusCode || status.UNAUTHORIZED).json({
        message: "Not Authorized, Please Login Again",
      });
    }
  };
};
