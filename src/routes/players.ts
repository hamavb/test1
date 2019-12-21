import { pathToFileURL} from "url";
import { Router, Request, Response, NextFunction } from "express";
import { Player } from "../services";
import { HTTPError, Result } from "../helpers";

export const playersRoute = Router();

const REMOTE_ENDPOINT = pathToFileURL("assets/headtohead.json").href;
const playerService = new Player(REMOTE_ENDPOINT);

playersRoute.get(
  "/:playerId",
  async (req: Request, res: Response, next: NextFunction) => {
    const getByIdResult = await playerService.getById(
      Number(req.params.playerId)
    );
    if (!getByIdResult.errless()) return next(getByIdResult.error);
    if (!getByIdResult.data) return next(new HTTPError(404, "Player not foud"));
    else res.status(200).send(getByIdResult.data);
  }
);

playersRoute.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllResult = await playerService.getAll();
    if (!getAllResult.errless()) return next(getAllResult.error);
    res.status(200).send(getAllResult.data);
  }
);
