import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user-model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import config from "../../config/config";


const {secretKey, refreshSecretKey} = config
export const findUser = async({id, email}: {id?: string, email?: string}) => {

    try {

        const user = await User.findOne({ $or: [{_id: id}, {email}]})
        if(!user){       
         throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");
 
       }

       return user

      
    } catch (error) {
        throw new ApiError(StatusCodes.NOT_FOUND, "user does not exist")
    }

}

export const findUsers = async() => {

    try {

        const users = await User.find()
        if(!users){       
         throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");
 
       }

       return users

      
    } catch (error) {
        throw new ApiError(StatusCodes.NOT_FOUND, "user does not exist")
    }

}


export const generateToken = async({id, email}: {id: string, email: string}) => {

    if(!secretKey){
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "JWT secret key missing")
    }
    const token = jwt.sign(
        {id, email},
        secretKey,
        {expiresIn: "3h"}
    )


    return token
}

export const generateRefreshToken = async({id, email}: {id: string, email: string}) => {

    if(!refreshSecretKey){
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "JWT secret key missing")
    }
    const refreshToken = jwt.sign(
        {id, email},
        refreshSecretKey,
        {expiresIn: "7d"}
    )


    return refreshToken
}