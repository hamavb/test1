import express from "express";
import { notFoundHandler, errorHandler } from "./middlwares";

const api = express();

api.use(notFoundHandler);
api.use(errorHandler);

export default api;