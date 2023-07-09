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
        res.status(200).json({ success: true, data: userDetails })
        return
    }
    catch (e) {
        res.status(404).json({ success: false, message: e.message })
    }
}



// const express = require('express');
// const cookieParser = require('cookie-parser');

// const app = express();

// app.use(cookieParser());

// app.get('/login', (req, res) => {
//   // Get the names of the cookies that you want to delete.
//   const cookiesToDelete = ['loginToken', 'sessionID'];

//   // Create a function to delete the cookies.
//   const deleteCookies = (cookies) => {
//     const response = res.clearCookies(cookies);
//     response.cookie('loginToken', '', { expires: new Date(0) });
//     response.cookie('sessionID', '', { expires: new Date(0) });
//     return response;
//   };

//   // Call the function to delete the cookies.
//   res = deleteCookies(cookiesToDelete);

//   // Render the login page.
//   res.render('login');
// });

// app.listen(3000, () => console.log('Server started on port 3000'));

module.exports.logoutUser = (req, res) => {
    const cookiesOption = {
        expiresAt: new Date(),
        httpOnly: true
    }
    try {
        res.cookie("token", null, cookiesOption)
        res.status(200).json({ success: true, message: "Loged Out" })
        return
    }
    catch (e) {
        res.status(404).json({ message: e.message })
        return
    }
}