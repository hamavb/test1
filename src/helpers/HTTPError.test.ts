import { HTTPError } from "./HTTPError";

describe("HTTPError", () => {
  it("should extends Error", () => {
    const error = new HTTPError(500, "error occured");

    expect(error).toBeInstanceOf(Error);
  });

  it("should augment classic Error with status property", () => {
    try {
      throw new HTTPError(401, "Forbidden");
    } catch(error) {
      expect(error.status).toBe(401);
      expect(error.message).toBe("Forbidden");
    }
  });
});
