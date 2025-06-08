import generateToken from "../config/token.js"
import User from "../models/user.js"
import bcrypt from "bcryptjs"

export const signUp = async (req,res)=>{
    try {
        const {firstname,lastname,username,email,password} = req.body
        const existedUser = await User.findOne({
            $or: [{username},{email}]
        }) 
        if(existedUser){
            return res.status(400).json({messsage:"already exists"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            firstname,
            lastname,
            email,
            username,
            password: hashPassword
        })
        const token= generateToken(user._id)
        res.cookie("token",token,{
            httpOnly: true,
            sameSite:"strict",
            secure: process.env.NODE_ENV === "production"
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({message: "signup error"})
       
    }
}
export const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user donot exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message: "incorrect password"})
        }
     const token= generateToken(user._id)
   
        res.cookie("token",token,{
            httpOnly: true,
            maxAge: 7*24*60*60*1000,
            sameSite:"strict",
            secure: process.env.NODE_ENV === "production"
        })
        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "login error"})
       
    }
}
export const logout = async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "logout"})
    } catch (error) {
         console.log(error)
        return res.status(500).json({message: "login error"})
    }
}