import express, { Application, Response, Request, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { ApiError, BadRequesterror, NotFoundError } from "./utils/ApiError"
import { ErrorHandler } from "./middlewares/ErrorHandler"
import { dbConnection } from "./database/dbConnection"
import dotenv from "dotenv"
import userRouter from "./routes/user_route"
import config from "../config/config"
import expressApp from "./express"
const app: Application = express()

dotenv.config()

expressApp(app)

app.use((req: Request) => {
    throw new NotFoundError(req.path)
})

app.use(ErrorHandler.handle)

dbConnection()
app.listen(config.port,  () => {
    console.log(`Server running on Port ${config.port}`)
})