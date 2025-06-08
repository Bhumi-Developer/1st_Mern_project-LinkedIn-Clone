import jwt from "jsonwebtoken"

const isAuth = async (req,res,next)=>{
   try {    
    const {token} = req.cookies    
    if(!token){
        return res.status(400).json({message: "token is not present"})
    }
    const verifyToken =  jwt.verify(token,process.env.JWT_SECRET)
    if(!verifyToken){
        return res.status(400).json({message: "token is not correct"})   
    }
    
    req.userId = verifyToken.id
    next()
   } catch (error) {    
     return res.status(500).json({message: "auth error"})
   }
}
export default isAuth