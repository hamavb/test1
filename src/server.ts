import { setupProcessEventHandlers } from "./helpers";

import api from "./api";

// setup Process events handlers to catch
// uncaught/rejected exception and to play
// nice with parent process
setupProcessEventHandlers(process);

api.listen(3000, (err: Error) => {
  if (err) throw err;

  console.log("server is up and running on port 3000");
});