import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user-model";

export const findUser = ({id, email}: {id?: string, email?: string}) => {

    try {

        const user = User.findById(id) ?? User.findOne({email})
        if(!user){       
         throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");
 
       }

       return user

      
    } catch (error) {
        throw new ApiError(StatusCodes.NOT_FOUND, "user does not exist")
    }

}

export const findUsers = ({id, email}: {id?: string, email?: string}) => {

    try {

        const users = User.find()
        if(!users){       
         throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");
 
       }

       return users

      
    } catch (error) {
        throw new ApiError(StatusCodes.NOT_FOUND, "user does not exist")
    }

}
