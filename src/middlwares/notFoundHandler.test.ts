import { Socket } from "net";
import { IncomingMessage, ServerResponse } from "http";
import express, { Request, Response, NextFunction } from "express";
import { notFoundHandler } from "./notFoundHandler";
import { HTTPError } from "../helpers";

describe("notFoundHandler", () => {
  it("should handle user-land Errors", () => {
    let fakeReq = new IncomingMessage(new Socket()); 
    let fakeRes = new ServerResponse(fakeReq); 

    const app = express();

    app.use(notFoundHandler);
    app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
      expect(err).toBeCalledWith(new HTTPError(404, "Ressource not found"));
    });

    app(fakeReq, fakeRes);
  });
});
