import { OutgoingMessage } from "http";
import { StatusCodes as status } from "http-status-codes";
import { Request, Response, NextFunction, Handler } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../libs/jwt.lib";
import { apiResponse } from "../helpers/apiResponse.helper";

const db = require("../db/models");

export const permission = (allowedRoles: string[]): Handler => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<OutgoingMessage> {
    try {
      const accessToken: string = (req.headers.authorization as string).split(
        "Bearer "
      )[1];
      const decodedToken: string | JwtPayload = await verifyToken(accessToken);

      const isAllowed = allowedRoles.some((role) =>
        decodedToken["role"].includes(role)
      );

      if (!isAllowed) {
        throw apiResponse(status.UNAUTHORIZED, "Your role is not allowed");
      }

      next();
    } catch (e: any) {
      return res.status(e.status || status.UNAUTHORIZED).json(e);
    }
  };
};
