module.exports = registerValidate = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    if (name && email && password && confirmPassword) {
        next()
    }
    else {
        res.status(404).json({ message: "Fill all fields" })
    }
}