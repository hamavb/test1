import { Response, Request, NextFunction } from "express";
import { HTTPError } from "../helpers";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let status = 500;
  let message = "Server error occured";
  if (err instanceof HTTPError) {
    status = err.status;
    message = err.message;
  }
 
  res.status(status)
  res.send({ message });
}
