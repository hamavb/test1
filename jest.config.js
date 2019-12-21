module.exports = {
    bail: true,
    collectCoverageFrom: ["src/**/*.ts$", "!**/node_modules/**"],
    testURL: "http://localhost",
    roots: ["src"],
    moduleDirectories: ["node_modules", "src"],
    "transform": {
      "^.+\\.ts$": "ts-jest"
    }
  };
  