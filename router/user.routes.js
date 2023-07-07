const express = require("express")
const userRegister = require("../controller/user.controller")
const userRegisterMiddleware = require("../middleware/userRegister.Validate")

const userRoute = express.Router()

userRoute.post("/register", userRegisterMiddleware, userRegister)

module.exports = userRoute