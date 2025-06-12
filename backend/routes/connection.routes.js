import express from "express"
import { acceptConnection, getConnectionRequests, getConnectionStatus, getUserConnections, rejectConnection, removeConnection, sendConnection } from "../controllers/connection.controllers.js"
import isAuth from "../middlewares/isAuth.js"

const ConnectionRouter = express.Router()

ConnectionRouter.post("/send/:id",isAuth,sendConnection)
ConnectionRouter.put("/accept/:connectionId",isAuth,acceptConnection)
ConnectionRouter.put("/reject/:connectionId",isAuth,rejectConnection)
ConnectionRouter.get("/getstatus/:userId",isAuth,getConnectionStatus)
ConnectionRouter.delete("/remove/:userId",isAuth,removeConnection)
ConnectionRouter.get("/requests",isAuth,getConnectionRequests)
ConnectionRouter.get("/",isAuth,getUserConnections)

export default ConnectionRouter