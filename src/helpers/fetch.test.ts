import { fetch } from "./fetch";

describe("fetch", () => {
  it("should be able to fetch ressources using <file://> protocol", async () => {
    const response = await fetch(`file://./${__filename}`);
    const content = await response.text();

    expect(content).toMatch(/describe\("fetch"/);
  });
});
