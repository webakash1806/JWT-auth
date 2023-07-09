const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const emailValidator = require("email-validator")

module.exports.userRegister = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    const validEmail = emailValidator.validate(email)
    if (!validEmail) {
        res.status(404).json({ message: "Please enter Valid email" })
        return
    }

    const uniqueEmail = await User.findOne({ email })
    if (uniqueEmail) {
        res.status(404).json({ message: "User is already registered with this email" })
        return
    }

    try {
        const hashPassword = await bcrypt.hash(password, 8)
        // const hashConfPassword = await bcrypt.hash(confirmPassword, 8)
        const user = new User({ name, email, password: hashPassword })
        if (password === confirmPassword) {
            const data = await user.save()
            res.status(200).json({
                message: "User Registered Successfully",
                userData: data
            })
        }
        else {
            res.status(404).json({ message: "Password and confirm Password are not same" })
        }
    }
    catch (err) {
        res.status(500).json({ Error: "Error in registration" })
    }
}

module.exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    const uniqueEmail = await User.findOne({ email })
    if (!uniqueEmail) {
        res.status(404).json({ message: "This email is not Registered" })
        return
    }

    try {
        const matchPassword = await bcrypt.compare(password, uniqueEmail.password)
        if (!matchPassword) {
            res.status(404).json({ message: "Wrong Password! Please Enter correct Password" })
            return
        }
        else {

            const token = uniqueEmail.jwtToken()
            uniqueEmail.password = undefined

            const cookieOption = {
                maxAge: 10 * 60 * 60 * 1000,
                httpOnly: true
            }

            res.cookie("token", token, cookieOption)

            res.status(200).json({ message: `Welcome ${uniqueEmail.name}! Login Successfull` })

        }
    }
    catch (err) {
        res.status(500).json({ Error: "Some Error Occured in Login" })
    }
}


module.exports.getUser = async (req, res) => {
    const uniqueId = req.userDetails.id

    try {
        const userDetails = await User.findById(uniqueId)
        res.status(200).json({
            success: true,
            data: userDetails
        })
    }
    catch (e) {
        res.status(404).json({
            success: false,
            message: e.message
        })
    }
}