import { NextFunction, Request, Response } from "express"
import { User } from "../models/user-model"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
// import { secretKey } from "../utils/store"
import config from "../../config/config"
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError"
import { STATUS_CODES } from "http"
import { createChannel, publismMessage } from "../utils/index"
import AuthService from "../services/auth"
import { generateRefreshToken, generateToken } from "../services"
import { UserIdProps } from "../types/types"

const {MEDICAL_SERVICE_BINDING_KEY} = config

const service = new AuthService()

export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
  const {profile, email, password, role, userName} = req.body

  const {lastName, phoneNumber, firstName, specialization, experience, designation } = profile
  // console.log(lastName)

  try {
      if(!email || !password){
          throw new ApiError(StatusCodes.BAD_REQUEST, "incomplete form field")
      }
   
      const newUser = await service.userRegister({profile, email, userName, password, role})
            console.log("existing user")

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Successfully created",
        data: newUser
    })


   
      
  } catch (error) {
      next(error)
  }
}
// export const signUp = async(req: Request, res: Response, next: NextFunction) => {
//   const {email, userName, password} = req.body
  

//   try {
//       if(!email || !password){
//           throw new ApiError(StatusCodes.BAD_REQUEST, "incomplete form")
//       }

    

//       const hashedPassword = bcrypt.hashSync(password)


//       const newUser =  await User.create({ email, userName, password: hashedPassword })

//       res.status(StatusCodes.OK).json({
//           success: true,
//           message: "Successfully created",
//           newUser
//       })
      
//   } catch (error) {
//       next(error)
//   }
// }

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    // const user = await User.findOne({ email });
    // if (!user) {
    //   return next(new ApiError(StatusCodes.NOT_FOUND, "User not found"));
    // }

    const data = await service.userSignIn({email, password})
    
  
    // Ensure secret key is available
 
    // Respond with token and user data
    res.status(StatusCodes.OK).json({
      data,
      message: "Login Successful",
    });
  } catch (error) {
    // Log unexpected errors and pass them to the error-handling middleware
    console.error("Internal Server Error:", error);
    return next(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred"
      )
    );
  }
};

  export const getUser = async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    
    try {
      
        const user = await User.findById(id)

        if (!user){
            res.status(StatusCodes.NOT_FOUND).json({
                message: "user not found"
            })
        }
        // await User.create({firstName, lastName, email, phoneNumber, userName })

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully created",
            data: user
        })
        
    } catch (error) {
        next(error)
    }
}


export const getUsers = async(req: Request, res: Response, next: NextFunction) => {

    
    try {
      
        const users = await User.find().select('-password -email')

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully created",
            data: users
        })
        
    } catch (error) {
        next(error)
    }
}


export const refreshToken = async (req: any, res: Response, next: NextFunction) => {
  if(!req.user){
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User is not authenticated");
  }
  const {id, email}   = req.user 
  const token = req.headers["refreshToken"];  // Extract token from header

  if(!id || !email) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User authentication failed")

  }
  try {

    const data = await service.userRefreshToken({id, email})
    res.status(StatusCodes.OK).json({
      data,
      success: true,
      message: "generate refresh token"
    })
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to generate token")
  }

}

export const updateUserProfile = async(req: any, res: Response, next: NextFunction) => {
  const {id, email}   = req.user as UserIdProps
  const {firstName, lastName, phoneNumber, address} = req.body
  try {
    
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to update profiie")

  }

}