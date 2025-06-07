import cookieParser from "cookie-parser"
import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"

dotenv.config()

let port = process.env.PORT || 3000

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/api/auth",authRouter)

app.listen(port,()=>{
    connectDb()
    console.log("server started")
})