import { Response, Request, NextFunction } from "express";
import { HTTPError } from "../helpers";
export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  const err = new HTTPError(404, "Resource not found");
  next(err);
}
