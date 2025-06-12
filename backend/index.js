import cookieParser from "cookie-parser"
import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import cors from "cors"
import postRouter from "./routes/post.routes.js"
import ConnectionRouter from "./routes/connection.routes.js"
import http from "http"
import { Server } from "socket.io"
export const userSocketMap = new Map()

const app = express()
let server = http.createServer(app)
 export const io = new Server(server,{
    cors:({
        origin : ['http://localhost:5173'],
        credentials: true
    })
})
io.on("connection",(socket)=>{
    // console.log("user connected",socket.id)
    socket.on("register",(userId)=>{
        userSocketMap.set(userId,socket.id)
    })

    socket.on("disconnect",(socket)=>{
        // console.log("user disconnected",socket.id)
    })
})
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
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/connection",ConnectionRouter)

server.listen(port,()=>{
    connectDb()
    console.log("server started")
})