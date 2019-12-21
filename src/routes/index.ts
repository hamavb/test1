import {Router} from "express"
import {playersRoute} from "./players"

export const routes = Router()

routes.use("/players", playersRoute)


