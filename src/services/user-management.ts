import { StatusCodes } from "http-status-codes"
import { User } from "../models/user-model"
import { ApiError } from "../utils/ApiError"
import { UserProfile } from "../models/profile-model"

class UserManagementService {
    updateUserProfile = async ({user_id, firstName, lastName, phoneNumber, address} : {user_id: string, firstName:string, lastName:string, phoneNumber:string, address:string}) => {
        try {
            const updateDateUser = UserProfile.findOneAndUpdate(
                {user_id},
                {firstName, lastName, phoneNumber, address},
                { new: true, runValidators: true }

            )
        

           return updateDateUser
        } catch (error) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to update profiie")

        }
    }

    CreateUserProfile = async ({user_id, firstName, lastName, phoneNumber, address} : {user_id: string, firstName:string, lastName:string, phoneNumber:string, address:string}) => {
        try {
            const newUserProfile = UserProfile.create(
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
}

export default UserManagementService