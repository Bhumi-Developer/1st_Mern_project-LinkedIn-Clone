import User from "../models/user.js"

export const getCurrentUser = async(req,res)=>{
    try {
        let userId = req.userId
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: user ID missing" });
          }
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message: "user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "current user error"})
    }
}