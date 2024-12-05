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
import UserManagementService from "../services/user-management"
import { findUser } from "../services"

const {MEDICAL_SERVICE_BINDING_KEY} = config

const service = new UserManagementService()


export const updateUserProfile = async(req: any, res: Response, next: NextFunction) => {

  const {lastName, phoneNumber, firstName,address, specialization, experience, designation } = req.body
  const {user} = req.user

  if(!user){
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to update profiie")

  }
  try {
   const data =  service.updateUserProfile( {firstName, lastName, phoneNumber, address, specialization, experience, designation, user_id: user.id ?? "none"} )

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

const getMeProfile = async(req: any, res: Response, next: NextFunction) => {
  const channel = await createChannel()


  const {id} = req.user

  // publismMessage(channel, MEDICAL_SERVICE_BINDING_KEY, JSON.stringify(user) )

  try {      
      const userProfile = await service.getUserProfile({user_id: id})
      res.status(StatusCodes.OK).json({
          success: true,
          message: "fetched user profile",
          data: userProfile
      })
      
  } catch (error) {
      next(error)
  }
}

export const getAllUserProfiles = async(req: any, res: Response, next: NextFunction) => {
  // const channel = await createChannel()


  const {id} = req.user

  console.log("firstsfsfsffdsgdgd")

  // publismMessage(channel, MEDICAL_SERVICE_BINDING_KEY, JSON.stringify(user) )

  try {      
      const userProfiles = await service.getUserProfiles()
      res.status(StatusCodes.OK).json({
          success: true,
          message: "fetched user profile",
          data: userProfiles
      })
      
  } catch (error) {
      next(error)
  }
}
const   createUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        
    }
}


export {getMeProfile, createUserProfile}