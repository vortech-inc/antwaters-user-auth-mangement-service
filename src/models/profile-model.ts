import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required:  true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
},
    {
        timestamps: true, 
    }
)


export const UserProfile = mongoose.model("UserProfile", profileSchema)