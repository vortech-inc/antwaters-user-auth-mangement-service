import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    userName: {
        type: String,
        required: true,
        unique: true

    },
    role: {
        type: String,
        required: true,
        enum: ["patient", "admin", "provider"]
    },

    refreshToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId, 
        ref: "UserProfile", 
        required: true


    }
})

export const User = mongoose.model("User", userSchema)