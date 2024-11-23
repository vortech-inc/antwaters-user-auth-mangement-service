import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    userName: {
        type: String,
        required: true
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
    }
})

export const User = mongoose.model("User", userSchema)