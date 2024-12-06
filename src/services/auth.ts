import { UserInfo } from "os"
import { User } from "../models/user-model"
import { ApiError } from "../utils/ApiError"
import { StatusCodes } from "http-status-codes"
import { findUser, generateRefreshToken, generateToken } from "."
import bcrypt from "bcryptjs";
import { IUserPayload } from "../types/types"
import { Profile } from "../models/profile-model"
import mongoose from "mongoose"

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

    userRegister = async({email, userName, password, role, profile }: IUserPayload ) => {
        const {phoneNumber, firstName, lastName, address} = profile
            const session = await mongoose.startSession()
            session.startTransaction()

        try {

            const existingUser =  await User.findOne({email})

            if(existingUser){
                throw new ApiError(StatusCodes.CONFLICT, "user already exist")
            }

            // console.log(existingUser)

            const hashedPassword = bcrypt.hashSync(password)

            const newUser =  await User.create([{ 
                email, userName, 
                role, 
                phoneNumber, 
                availability: 
                role=="provider" ?   {status: true} : null, 
                password: hashedPassword }], 
                {session})

                
            const userProfile = await Profile.create([{user: newUser[0]._id, phoneNumber, firstName, lastName, address }], {session})

            if(role == "provider"){
                 await Profile.create([{user: newUser[0]._id, phoneNumber, firstName, lastName, address }], {session})

            }
            // console.log("existing user", existingUser)

            await session.commitTransaction()
            session.endSession()

            return newUser
        } catch (error) {

            await session.abortTransaction()
            await session.endSession()

            if(error  instanceof ApiError){
                throw error

            }
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR,
                 error instanceof Error ? error.message : "An unexpected error occurred")
        }
    }

    userSignIn = async ({ email, password }: { email: string; password: string }) => {
        try {
            // Fetch user by email
            const user = await findUser({ email });
    
            // Check if user exists
            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, "User with this email does not exist");
            }
    
            // Check if password is correct
            const isPasswordCorrect = bcrypt.compareSync(password, user.password as string);
            if (!isPasswordCorrect) {
                throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid password");
            }
    
            // Generate tokens
            const token = await generateToken({ id: user.id, email: user.email as string });
            const refreshToken = await generateRefreshToken({ id: user.id, email: user.email as string});
    
            return { user, token, refreshToken };
        } catch (error: any) {
            console.error("Error in userSignIn:", error.message);
            // Re-throw original error if it's an ApiError
            if (error instanceof ApiError) {
                throw error;
            }
            // Throw generic error for unexpected issues
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to sign in user");
        }
    };


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