import { UserInfo } from "os"
import { User } from "../models/user-model"
import { ApiError } from "../utils/ApiError"
import { StatusCodes } from "http-status-codes"
import { findUser } from "."

class AuthService {
    constructor(){


    }

    getUsers = async(id: string ) => {
        try {
            findUser({id})
        } catch (error) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'could not find user')

        }
    }

    getUser = async(id?: string, email?: string) => {

        try {
            findUser({id,  email})
        } catch (error) {
           throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'failed to find user')
        }
        
    }

    
}


export default AuthService