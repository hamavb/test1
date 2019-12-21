import { EventEmitter } from "events";

let initialized = false;
export function setupProcessEventHandlers(
  eventEmitter: EventEmitter & { exit: (code?: number) => void }
) {
  // simple check to avoid re-assigning event handlers
  if (initialized) return;

  // log into the stderr and let the process crash
  // to avoid a corrupted state, parent process should take care
  // of respawning the server
  eventEmitter.addListener("unhandledRejection", (reason, promise) => {
    console.error(
      "Caught an Unhandled Rejection at:",
      promise,
      "reason:",
      reason
    );
    throw Error(reason);
  });

  eventEmitter.addListener("uncaughtException", (err, origin) => {
    console.error("Caught an exception:", err, "origin:", origin);
    throw err;
  });

  eventEmitter.addListener("SIGILL", () => {
    eventEmitter.exit();
  });

  initialized = true;
}
