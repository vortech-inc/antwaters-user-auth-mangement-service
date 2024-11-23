import express from "express"
import { registerUser, getProfile, getUser, getUsers, login } from "../controller/auth_controller"
import authenticateUser from "../middlewares/authentication"
const userRouter = express.Router()


userRouter.get("/profile", authenticateUser, getProfile)
userRouter.post("/login", login)
userRouter.post("/create", registerUser)
userRouter.get("/", getUsers)
userRouter.get("/:id", getUser)




export default userRouter