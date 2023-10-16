import { Request, Response, NextFunction, Handler } from "express";
import { StatusCodes as status } from "http-status-codes";
import { IncomingHttpHeaders, OutgoingMessage } from "http";
import { apiResponse } from "../helpers/apiResponse.helper";

export const authorization = (): Handler => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<OutgoingMessage> {
    try {
      let headers: IncomingHttpHeaders = req.headers;
      if (!Object.keys(headers).includes("authorization"))
        throw apiResponse(status.UNAUTHORIZED, "Authorization is required");

      const authorization: boolean | undefined = (
        headers.authorization as string
      ).includes("Bearer");

      const accessToken: string = (headers.authorization as string).split(
        "Bearer "
      )[1];
      if (!accessToken)
        throw apiResponse(status.UNAUTHORIZED, "Access Token is required");

      const validJwt: string[] = (accessToken as string).split(".");
      if (validJwt.length !== 3)
        throw apiResponse(
          status.UNAUTHORIZED,
          "Access Token format is not valid"
        );

      req.headers.authorization = `Bearer ${accessToken}`;

      next();
    } catch (error) {
      return res.status(status.UNAUTHORIZED).json(error);
    }
  };
};
