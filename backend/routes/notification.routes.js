import express from "express"
import { clearAllNotification, deleteNotification, getNotification } from "../controllers/notification.controllers.js"
import isAuth from "../middlewares/isAuth.js"

const notificationRouter = express.Router()

notificationRouter.get("/get",isAuth,getNotification)
notificationRouter.delete("/deleteone/:id",isAuth,deleteNotification)
notificationRouter.delete("/deletemany",isAuth,clearAllNotification)

export default notificationRouter