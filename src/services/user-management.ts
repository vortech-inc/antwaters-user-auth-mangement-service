import { StatusCodes } from "http-status-codes"
import { User } from "../models/user-model"
import { ApiError } from "../utils/ApiError"
import { Profile } from "../models/profile-model"
import { IProfile } from "../types/types"

interface UpdateProp extends IProfile{
    user_id?: string
}

class UserManagementService {
    updateUserProfile = async ({user_id, firstName, lastName, phoneNumber, address, specialization, designation, experience} : UpdateProp ) => {
        try {
            const updateDateUser = Profile.findOneAndUpdate(
                {user: user_id},
                {firstName, lastName, phoneNumber, address, specialization, designation, experience},
                { new: true, runValidators: true }

            )
        

           return updateDateUser
        } catch (error) {
            throw new ApiError(StatusCodes.BAD_REQUEST, error instanceof ApiError ?  error.message : "An unexpected error occurred")

        }
    }

    CreateUserProfile = async ({user_id, firstName, lastName, phoneNumber, address} : {user_id: string, firstName:string, lastName:string, phoneNumber:string, address:string}) => {
        try {
            const newUserProfile = Profile.create(
                {user_id,
                firstName, 
                lastName, 
                phoneNumber, 
                address}
         

            )
        

           return newUserProfile
        } catch (error) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to update profiie")

        }
    }

   getUserProfile = async ({user_id} : {user_id: string}) => {
        try {
            const userProfile = Profile.findOne({user: user_id }).populate("user")
            
            console.log("profile fetched", userProfile)
            
            if(!userProfile){
                throw new ApiError(StatusCodes.BAD_REQUEST, "user whith the profile does not exist")

            }

           return userProfile
        } catch (error) {
            if(error instanceof ApiError){
                throw error
            }
            throw new ApiError(StatusCodes.BAD_REQUEST, error instanceof Error ?  error.message : "something went wrong")

        }
    }



getUserProfiles = async () => {
    try {
        const userProfile = Profile.find().populate("user")
        
        console.log("profile fetched", userProfile)
        
        if(!userProfile){
            throw new ApiError(StatusCodes.BAD_REQUEST, "user whith the profile does not exist")

        }

       return userProfile
    } catch (error) {
        if(error instanceof ApiError){
            throw error
        }
        throw new ApiError(StatusCodes.BAD_REQUEST, error instanceof Error ?  error.message : "something went wrong")

    }
}
}

export default UserManagementService