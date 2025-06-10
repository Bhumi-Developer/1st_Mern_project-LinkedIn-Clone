import User from "../models/user.js"
import uploadOnCloudinary from "../config/cloudinary.js"

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
export const updateProfile = async (req, res) => {
    try {
      const { firstname, lastname, username, headline, location, gender } = req.body;
  
      let skills = [], education = [], experience = [];
      try {
        skills = req.body.skills ? JSON.parse(req.body.skills) : [];
        education = req.body.education ? JSON.parse(req.body.education) : [];
        experience = req.body.experience ? JSON.parse(req.body.experience) : [];
      } catch (err) {
        return res.status(400).json({ message: "Invalid JSON format" });
      }
  
      let profileImage, coverImage;
  
      if (req.files?.profileImage?.[0]) {
        profileImage = await uploadOnCloudinary(req.files.profileImage[0].path);
      }
      if (req.files?.coverImage) {
        coverImage = await uploadOnCloudinary(req.files.coverImage[0].path);
      }
  
      const updateData = {
        firstname,
        lastname,
        username,
        headline,
        location,
        gender,
        skills,
        education,
        experience,
      };
      if (profileImage) updateData.profileImage = profileImage;
      if (coverImage) updateData.coverImage = coverImage;
  
      const user = await User.findByIdAndUpdate(req.userId, updateData, {
        new: true,
      }).select("-password");
  
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Update error", error: error.message });
      console.log(error)
    }
  };
  