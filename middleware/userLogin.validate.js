module.exports = loginValidation = async (req, res, next) => {
    const { email, password } = req.body
    if (email && password) {
        next()
    }
    else {
        res.status(404).json({ Message: "Input all fields" })
    }
}