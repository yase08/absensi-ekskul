import { Handler, NextFunction, Request, Response } from "express";
import { OutgoingMessage } from "http";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../libs/jwt.lib";
import { Session } from "express-session";
import { StatusCodes as status } from "http-status-codes";

interface ISession extends Session {
  user: any;
}

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
      const user = await db.user.findOne({ where: { id: Number(decoded.id) } });
      (req.session as ISession).user = user;
      next();
    } catch (error: any) {
      return res.status(error.statusCode || status.UNAUTHORIZED).json({
        message: "Not Authorized, Please Login Again",
      });
    }
  };
};
