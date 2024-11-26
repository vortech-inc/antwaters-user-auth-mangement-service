import { UserInfo } from "os"
import { User } from "../models/user-model"
import { ApiError } from "../utils/ApiError"
import { StatusCodes } from "http-status-codes"
import { findUser, generateRefreshToken, generateToken } from "."
import bcrypt from "bcryptjs";

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

    userSignUp = async({email, userName, password}: {email: string, userName: string, password: string}) => {
        try {
            const existingUser =  findUser({email})
            if(!existingUser){
                throw new ApiError(StatusCodes.CONFLICT, "user already exist")
            }

            const hashedPassword = bcrypt.hashSync(password)
            const newUser =  await User.create({ email, userName, password: hashedPassword })
            
            return newUser
        } catch (error) {
            
        }
    }

    userRegister = async({email, userName, password, firstName, lastName, phoneNumber}: {phoneNumber: string, lastName: string, firstName: string, email: string, userName: string, password: string}) => {
        try {
            const existingUser =  findUser({email})
            if(!existingUser){
                throw new ApiError(StatusCodes.CONFLICT, "user already exist")
            }

            const hashedPassword = bcrypt.hashSync(password)
            const newUser =  await User.create({ email, userName, firstName, lastName, phoneNumber, password: hashedPassword })
            
            return newUser
        } catch (error) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "failed to register user")
        }
    }


    userSignIn = async({email, password}: {email: string, password: string}) => {
        try {
            const user = await findUser({email})
            const token = await generateToken({id: user?.id ?? "no key", email: user.email})
            const refreshToken = await generateRefreshToken({id: user?.id ?? "no key", email})

            if(!user){
                throw new ApiError(StatusCodes.NOT_FOUND, "user with email does not exist")
            }

            const isPasswordCorrect = bcrypt.compareSync(password, user.password)
            if(!isPasswordCorrect){
                throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid password")
            }
            return {user, token, refreshToken}
        } catch (error) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "failed to register user")

        }
    }

    


    userRefreshToken = async({id, email}: { id: string , email: string}) => {


        try {
            const existingUser = User.findById(id)

            if(!existingUser){
                throw new ApiError(StatusCodes.NOT_FOUND, "user not found")

            }

            // if(!refreshToken){
            //     throw new ApiError(StatusCodes.NOT_FOUND, "No refreshtok eprovided")



            // }

            return{
                token:  generateToken({id, email}),
                refreshToken:  generateRefreshToken({id, email})
          
             }  
            
        } catch (error) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "failed to register user")

        }
     }

}

export default AuthService