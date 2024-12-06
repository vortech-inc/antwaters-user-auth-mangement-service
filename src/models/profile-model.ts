import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: {
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
        // required: true
    }, 
    designation: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        // required: true
    },
    experience: {
        type: Number,
        // required: true
    },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
              ret.id = ret._id.toString();
              delete ret._id;
              delete ret.__v;
              return ret;
            },
          } 
    }
)


export const Profile = mongoose.model("Profile", profileSchema)