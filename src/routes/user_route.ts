import express from "express"
import { registerUser, getUser, getUsers, login, refreshToken } from "../controller/auth_controller"
import { authenticateRefreshToken, authenticateUser } from "../middlewares/authentication"
import { getAllUserProfiles, getMeProfile } from "../controller/user_controller"
const userRouter = express.Router()


userRouter.get("/profile", authenticateUser, getMeProfile) 
userRouter.get("/profiles", authenticateUser, getAllUserProfiles) 


userRouter.post("/login", login)
userRouter.post("/create", registerUser)
userRouter.get("/", getUsers)
userRouter.get("/:id", getUser)
userRouter.get("/refresh-token", authenticateRefreshToken, refreshToken)


export default userRouter