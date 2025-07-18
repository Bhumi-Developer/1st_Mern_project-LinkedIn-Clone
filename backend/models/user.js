import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    coverImage: {
        type: String,
        default: ""
    },
    headline: {
        type: String,
        default: ""
    },
    skills: [
        {
            type: String
        }
    ],
    education: [
        {
            college: {
                type: String
            },
            degree: {
                type: String
            },
            fieldOfStudy: {
                type: String
            }
        }
    ],
    location: {
        type: String,
        default: "India"
    },
    gender: {
        type: String,
        enum: ["male","female","others"]
    },
    experience: [
        {
            title: {
                type: String
            },
            company: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    connection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},{
    timestamps: true
}
)


const User = mongoose.model("User",userSchema)
export default User