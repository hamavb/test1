import { IncomingMessage, ServerResponse } from "http";
import { Socket } from "net";
import express, { Request, Response, NextFunction } from "express";
import { errorHandler } from "./errorHandler";
import { HTTPError } from "../helpers";

describe("errorHandler", () => {
  let app: ReturnType<typeof express>;
  let fakeReq: IncomingMessage;
  let fakeRes: ServerResponse;
  let sendSpy: jest.Mock;
  let statusSpy: jest.Mock;

  beforeEach(() => {
    app = express();
    fakeReq = new IncomingMessage(new Socket());
    fakeRes = new ServerResponse(fakeReq); 
    fakeReq.url = "/url";
    fakeReq.method = "GET";
    sendSpy = jest.fn();
    statusSpy = jest.fn();
  });

  it("should handle user-land Errors", () => {
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.status = statusSpy;
      res.send = sendSpy;
      next(Error("random error"));
    });

    app.use(errorHandler);

    app(fakeReq, fakeRes);

    expect(statusSpy).toBeCalledTimes(1);
    expect(statusSpy).toBeCalledWith(500);

    expect(sendSpy).toBeCalledTimes(1);
    expect(sendSpy).toBeCalledWith({ message: "Server error occured" });
  });

  it("should handle user-land HTTP Errors", () => {
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.status = statusSpy;
      res.send = sendSpy;
      next(new HTTPError(451, "Unavailable For Legal Reasons"));
    });

    app.use(errorHandler);

    app(fakeReq, fakeRes);

    expect(statusSpy).toBeCalledTimes(1);
    expect(statusSpy).toBeCalledWith(451);
    expect(sendSpy).toBeCalledTimes(1);
    expect(sendSpy).toBeCalledWith({
      message: "Unavailable For Legal Reasons"
    });
  });
});
