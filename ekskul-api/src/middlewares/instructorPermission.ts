import { Handler, NextFunction, Request, Response } from "express";
import { Session } from "express-session";

interface ISession extends Session {
  user: any;
}

export const checkInstructorPermission = (): Handler => {
  return function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<any, Record<string, any>> | void {
    const instructorIdFromParams = Number(req.params.instructor_id);
    console.log(instructorIdFromParams);
    
    const authenticatedTeacherId = (req.session as ISession).user?.id;

    if (instructorIdFromParams !== authenticatedTeacherId) {
      return res.status(403).json({ message: "Access forbidden" });
    }

    next();
  };
};
