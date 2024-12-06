import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    userName: {
        type: String,
        // required: true,
        // unique: true

    }, 
    availability: {
        status:{
            type: Boolean,
        } 
        // required: true,
        // unique: true

    },
    role: {
        type: String,
        required: true,
        enum: ["patient", "admin", "provider"]
    }
}, {
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
})


// userSchema.virtual("profile", {
//     ref: "UserProfile", // The related model
//     localField: "_id",  // The User's ID field
//     foreignField: "user", // The User field in UserProfile
//     justOne: true, // Because it's a one-to-one relationship
// });

export const User = mongoose.model("User", userSchema)