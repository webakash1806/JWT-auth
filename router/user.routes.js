const express = require("express")
// const userLogin = require("../controller/user.controller")
const userRegisterMiddleware = require("../middleware/userRegister.Validate")
const userLoginMiddleware = require("../middleware/userLogin.validate")
const getUserMiddleware = require("../middleware/getUser.validate")
const { userRegister, userLogin, getUser } = require("../controller/user.controller")


const userRoute = express.Router()


userRoute.post("/register", userRegisterMiddleware, userRegister)

userRoute.post("/login", userLoginMiddleware, userLogin)

userRoute.get("/user", getUserMiddleware, getUser)

module.exports = userRoute