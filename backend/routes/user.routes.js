import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser, getprofile, search } from "../controllers/user.controllers.js"
import upload from "../middlewares/multer.js"
import { updateProfile } from "../controllers/user.controllers.js"

const userRouter = express.Router()

userRouter.get("/currentUser",isAuth,getCurrentUser)

userRouter.put("/updateprofile",isAuth,upload.fields([
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateProfile)
userRouter.get("/profile/:username",isAuth,getprofile)
userRouter.get("/search",isAuth,search)

export default userRouter