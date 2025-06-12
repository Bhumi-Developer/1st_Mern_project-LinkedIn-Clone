// import { Connection } from "mongoose"
import { userSocketMap } from "../index.js"
import User from "../models/user.js"
import Connection from "../models/connection.js"; 


export const sendConnection = async(req,res)=>{
    try {
        let {id} = req.params
        let sender = req.userId
        let user = await User.findById(sender)

        if(sender == id){
            return res.status(400).json({message:"req to yourself"})
       }
       if(user.connection.includes(id)){
        return res.status(400).json({message:"already connected"})
       }

       let existingConnection = await Connection.findOne({
        sender,
        receiver:id,
        status: "pending"
       })
       if(existingConnection){
        return res.status(400).json({message:"req already sent"})
       }
       let newRequest = await Connection.create({
        sender,
        receiver:id
       })

       let receiverSocketId = userSocketMap.get(id)
       let senderSocketId = userSocketMap.get(sender)

       if(receiverSocketId){
        io.to(receiverSocketId).emit("statusUpdate",{updatedUserId:sender,newStatus:"received"})
       }
       if(senderSocketId){
        io.to(senderSocketId).emit("statusUpdate",{updatedUserId:id,newStatus:"pending"})
       }

       return res.status(200).json(newRequest)

    } catch (error) {
        return res.status(500).json({message: `${error}`})
    }
}

export const acceptConnection = async(req,res)=>{
    try {
        let {connectionId} = req.params
        let connection = await Connection.findById(connectionId)
        if(!connection){
            return res.status(400).json({message:"connection donot exist"})
        }
        if(connection.status!="pending"){
            return res.status(400).json({message:"req under process"})
        }
        connection.status="accepted"
        await connection.save()
        await User.findByIdAndUpdate(req.userId,{
            $addToSet:{connection:connection.sender._id}
        })
        await User.findByIdAndUpdate(connection.sender._id,{
            $addToSet:{connection:req.userId}
        })


        let receiverSocketId = userSocketMap.get(connection.receiver._id.toString())
        let senderSocketId = userSocketMap.get(connection.sender._id.toString())
 
        if(receiverSocketId){
         io.to(receiverSocketId).emit("statusUpdate",{updatedUserId:connection.sender._id,newStatus:"diconnect"})
        }
        if(senderSocketId){
         io.to(senderSocketId).emit("statusUpdate",{updatedUserId:req.userId,newStatus:"diconnect"})
        }

        return res.status(200).json({message:"connection accepted"})
    } catch (error) {
        return res.status(500).json({message:"connection error"})
    }
}

export const rejectConnection = async(req,res)=>{
    try {
        let {connectionId} = req.params
        let connection = await Connection.findById(connectionId)
        if(!connection){
            return res.status(400).json({message:"connection donot exist"})
        }
        if(connection.status!="pending"){
            return res.status(400).json({message:"req under process"})
        }
        connection.status="rejected"
        await connection.save()
       
        return res.status(200).json({message:"connection rejected"})
    } catch (error) {
        return res.status(500).json({message:"rejection error"})
    }
}

export const getConnectionStatus = async (req, res) => {
    try {
      const targetUserId = req.params.userId;
      const currentUserId = req.userId;
  
     
      const currentUser = await User.findById(currentUserId);
  
      if (!currentUser) {
        console.log("Current user not found");
        return res.status(404).json({ message: "User not found" });
      }
  
      if (currentUser.connection.includes(targetUserId)) {
        return res.json({ status: "disconnect" });
      }
  
      const pendingRequest = await Connection.findOne({
        $or: [
          { sender: currentUserId, receiver: targetUserId },
          { sender: targetUserId, receiver: currentUserId }
        ],
        status: "pending",
      });
  
      if (pendingRequest) {
        if (pendingRequest.sender.toString() === currentUserId.toString()) {
          return res.json({ status: "pending" });
        } else {
          return res.json({ status: "received", requestId: pendingRequest._id });
        }
      }
  
      return res.json({ status: "Connect" });
    } catch (error) {
      return res.status(500).json({
        message: "getstatus error",
        error: error.message
      });
    }
  };
  

export const removeConnection = async(req,res)=>{
    try {
        const myId = req.userId
        const otherUserId = req.params.userId

        if (!myId || !otherUserId) {
            return res.status(400).json({ message: "Invalid user IDs" });
        }

        await User.findByIdAndUpdate(myId,{$pull: {connection:otherUserId}})

        await User.findByIdAndUpdate(otherUserId,{$pull: {connection:myId}})

        let receiverSocketId = userSocketMap.get(otherUserId.toString())
        let senderSocketId = userSocketMap.get(myId.toString())
 
        if(receiverSocketId){
         io.to(receiverSocketId).emit("statusUpdate",{updatedUserId:myId,newStatus:"connect"})
        }
        if(senderSocketId){
         io.to(senderSocketId).emit("statusUpdate",{updatedUserId:otherUserId,newStatus:"connect"})
        }

        return res.json({message:"Connection removed"})
    } catch (error) {
        return res.status(500).json({message: "remove connection error"})
    }
}

export const getConnectionRequests = async(req,res)=>{
    try {
        const userId = req.userId
        const requests = await Connection.find({ receiver:userId,status:"pending"}).populate("sender","firstname lastname email username profileImage headline")
        return res.status(200).json(requests)
    } catch (error) {
        return res.status(500).json({message: "all connection error"})
    }
}
export const getUserConnections = async(req,res)=>{
    try {
        const userId = req.userId
        const user = await User.findById(userId).populate("connection","firstname lastname username profileImage headline connection")
        return res.status(200).json(user.connection)
    } catch (error) {
        return res.status(500).json({message: "user connection error"})
    }
}