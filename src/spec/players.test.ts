import request from "supertest";
import { Response, Headers } from "node-fetch";
import { fetch } from "../helpers/fetch";
import api from "../api";

jest.mock("../helpers/fetch");

const fetchMock = <jest.Mock>fetch;
const dummyPlayers = { players: [{ id: 123 }] };

function createFakeResponse(
  status: number,
  message: string,
  body?: string
): Promise<Response> {
  const headers = new Headers();
  const buffer = body ? Buffer.from(body, "utf-8") : null;
  headers.set("Content-Length", (buffer ? buffer.byteLength : 0).toString());
  return Promise.resolve(
    new Response(buffer, {
      url: "/test",
      status,
      statusText: message,
      headers
    })
  );
}

describe("players", () => {
  describe("/players", () => {
    it("should be able to fetch all players", async () => {
      fetchMock.mockImplementation(() =>
        createFakeResponse(200, "OK", JSON.stringify(dummyPlayers))
      );
      await request(api)
        .get("/players")
        .expect(200)
        .expect(dummyPlayers.players);
    });

    it("should forward upstream errors", async () => {
      fetchMock.mockImplementation(() =>
        createFakeResponse(401, "Error occured")
      );
      await request(api)
        .get("/players")
        .expect(401);
    });
  });

  describe("/players/playerId", () => {
    it("should be able to fetch a specific player", async () => {
      fetchMock.mockImplementation(() =>
        createFakeResponse(200, "OK", JSON.stringify(dummyPlayers))
      );
      await request(api)
        .get("/players/123")
        .expect(200)
        .expect(dummyPlayers.players[0]);
    });

    it("should return 404 if player not found", async () => {
      fetchMock.mockImplementation(() =>
        createFakeResponse(200, "OK", JSON.stringify(dummyPlayers))
      );
      await request(api)
        .get("/players/9999999") // 9999999 = unknowing id
        .expect(404);
    });

    it("should forward upstream errors", async () => {
      fetchMock.mockImplementation(() =>
        createFakeResponse(401, "Error occured")
      );
      await request(api)
        .get("/players/123")
        .expect(401);
    });
  });
});
