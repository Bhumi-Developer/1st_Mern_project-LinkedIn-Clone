import Notification from "../models/notification.js"

export const getNotification = async(req,res)=>{
    try {
        let notification = await Notification.find({receiver:req.userId})
        .populate("relatedUser","firstname lastname profileImage")
        .populate("relatedPost","image description")
        return res.status(200).json(notification)
    } catch (error) {
        return res.status(500).json({message: "get notification error"})
    }
}
export const deleteNotification = async(req,res)=>{
    try {
        let {id} = req.params
        await Notification.findByIdAndDelete({
            _id: id,
            receiver:req.userId
        })
        return res.status(200).json({message: "notification deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "delete notification error"})
    }
}

export const clearAllNotification = async(req,res)=>{
    try {
        await Notification.deleteMany({
            receiver:req.userId
        })
        return res.status(200).json({message: " allnotification deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "delete notification error"})
    }
}