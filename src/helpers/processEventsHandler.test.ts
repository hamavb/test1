import { EventEmitter } from "events";
import { setupProcessEventHandlers } from "./processEventsHandler";

interface ProcessEventEmitter extends EventEmitter {
    exit: (code?: number) => void
}

class Process extends EventEmitter implements ProcessEventEmitter {
    exit(code?: number) {}
} 

describe("setupProcessEventHandlers", () => {
  let processObject: Process = new Process();

  it("should add unhandledRejection, uncaughtException and SIGILL event handlers to nodejs process", () => {
    setupProcessEventHandlers(processObject);

    expect(processObject.listeners("unhandledRejection")).toBeTruthy();
    expect(processObject.listeners("uncaughtException")).toBeTruthy();
    expect(processObject.listeners("SIGILL")).toBeTruthy();
  });

});
