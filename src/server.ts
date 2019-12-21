import express from "express";

const api = express()

api.listen(3000, (err: Error) => {
  if (err) throw err;

  console.log("server is up and running on port 3000");
});

export default api;