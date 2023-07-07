const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const emailValidator = require("email-validator")

module.exports.userRegister = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const uniqueEmail = await User.findOne({ email })
    if (uniqueEmail) {
        res.status(404).json({ message: "User is already registered with this email" })
        return
    }

    try {
        const hashPassword = await bcrypt.hash(password, 8)
        const hashConfPassword = await bcrypt.hash(confirmPassword, 8)
        const user = new User({ name, email, password: hashPassword, confirmPassword: hashConfPassword })
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
        }
        else {
            res.status(200).json({ message: `Welcome ${uniqueEmail.name}! Login Successfull` })
        }
    }
    catch (err) {
        res.status(500).json({ Error: "Some Error Occured in Login" })
    }

}