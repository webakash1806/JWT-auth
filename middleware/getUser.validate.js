const JWT = require("jsonwebtoken")

module.exports = getUser = async (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null

    if (!token) {
        res.status(404).json({
            sucess: false,
            message: "Login again!"
        })
    }

    try {
        const tokenVerify = JWT.verify(token, process.env.SECRET)
        req.userDetails = { id: tokenVerify.id, email: tokenVerify.email }
    }
    catch (e) {
        res.status(404).json({
            success: false,
            message: e.message
        })
    }

    next()
}