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

const {MEDICAL_SERVICE_BINDING_KEY} = config

export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
    const {firstName, lastName, email, phoneNumber, userName, password} = req.body
    

    try {
        if(!firstName || !lastName || !email || !password){
            throw new ApiError(StatusCodes.BAD_REQUEST, "incomplete form")
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            throw new ApiError(StatusCodes.CONFLICT, "user already exist")
        }

        const hashedPassword = bcrypt.hashSync(password)

        console.log(hashedPassword)

        const newUser =  await User.create({firstName, lastName, email, phoneNumber, userName, password: hashedPassword })

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully created",
            newUser
        })
        
    } catch (error) {
        next(error)
    }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError(StatusCodes.NOT_FOUND, "User not found"));
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "Invalid password"));
    }

    // Ensure secret key is available
    if (!config.secretKey) {
      return next(
        new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "JWT secret key is missing"
        )
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.secretKey,
      { expiresIn: "1h" }
    );

    // Respond with token and user data
    res.status(StatusCodes.OK).json({
      token,
      data: user,
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

  export const getProfile = async(req: any, res: Response, next: NextFunction) => {
    const channel = await createChannel()


    const user = req.user

    publismMessage(channel, MEDICAL_SERVICE_BINDING_KEY, JSON.stringify(user) )

    try {      
        const userProfile = await User.findById(user.id)
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully created",
            data: userProfile
        })
        
    } catch (error) {
        next(error)
    }
}
export const getUsers = async(req: Request, res: Response, next: NextFunction) => {

    
    try {
      
        const users = await User.find()

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully created",
            data: users
        })
        
    } catch (error) {
        next(error)
    }
}