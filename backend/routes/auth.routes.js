import express from "express"
import { login, logout, signUp } from "../controllers/auth.controllers.js"

const authRouter = express.Router()

authRouter.post("/signUp",signUp)
authRouter.post("/login",login)
authRouter.get("/logout",logout)

export default authRouter