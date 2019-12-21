import { fetch, HTTPError, Result } from "../../helpers";
import { PlayerType } from "./Player";

export class Player {
  constructor(public endpoint: string) {}

  getAll(): Promise<Result<PlayerType[]>> {
    return fetch(this.endpoint).then(async res => {
      if (res.ok) {
        const jsonContent = await res.json();
        return new Result(
          (jsonContent.players as PlayerType[]).sort((prev, next) => {
            if (prev.id > next.id) return 1;
            if (prev.id < next.id) return -1;
            return 0;
          })
        );
      }
      return new Result(null, new HTTPError(res.status, res.statusText));
    });
  }

  getById(playerId: number): Promise<Result<PlayerType>> {
    return this.getAll().then(result =>
      result.errless()
        ? new Result(result.data.find(({ id }) => id === playerId))
        : new Result(null, result.error)
    );
  }
}
