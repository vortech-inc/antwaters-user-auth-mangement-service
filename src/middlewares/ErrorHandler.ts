import { StatusCodes } from "http-status-codes"
import { ApiError } from "../utils/ApiError"
import { NextFunction, Request, Response } from "express"

export class ErrorHandler {
   static handle = (
    err: ApiError, 
    req: Request, 
    res: Response, 
    next: NextFunction
)=> {

    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
      res.status(statusCode).send({
        success: false,
        message: err.message,
    })
}

    }
