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
import UserManagementService from "../services/user-management"

const {MEDICAL_SERVICE_BINDING_KEY} = config

const service = new UserManagementService()


export const updateUserProfile = async(req: Request, res: Response, next: NextFunction) => {

const user = req.user

  if(!user){
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to update profiie")

  }
  const {firstName, lastName, phoneNumber, address} = req.body
  try {
   const data =  service.updateUserProfile( {firstName, lastName, phoneNumber, address, user_id: user.id ?? "none"} )

   if(!data) {
        // Throw an error if no profile was found
        return res.status(StatusCodes.NOT_FOUND).json({
            error: "User profile not found",
        });
    
   }
    res.status(StatusCodes.OK).json({
         success: true,
      message: "user updated refresh token",
      data
}) 

    
    
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to update profiie")

  }




}

const   CreateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        
    }
}
