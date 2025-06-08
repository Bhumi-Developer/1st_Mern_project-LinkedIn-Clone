import cookieParser from "cookie-parser"
import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import cors from "cors"

const app = express()
app.use(cors({
    origin : ['http://localhost:5173'],
    credentials: true
}))

dotenv.config()

let port = process.env.PORT || 3000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/api/auth",authRouter)
app.use("/api/auth",userRouter)

app.listen(port,()=>{
    connectDb()
    console.log("server started")
})