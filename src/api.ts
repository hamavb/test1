import express from "express";
import { notFoundHandler, errorHandler } from "./middlwares";
import {routes} from "./routes"

const api = express();

api.use(routes)
api.use(notFoundHandler);
api.use(errorHandler);

export default api;