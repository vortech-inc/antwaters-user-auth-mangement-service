import express from "express"
import { createUser, getProfile, getUser, getUsers, login } from "../controller/users_controller"
import authenticateUser from "../middlewares/authentication"
const userRouter = express.Router()


userRouter.get("/profile", authenticateUser, getProfile)
userRouter.post("/login", login)
userRouter.post("/create", createUser)
userRouter.get("/", getUsers)
userRouter.get("/:id", getUser)




export default userRouter