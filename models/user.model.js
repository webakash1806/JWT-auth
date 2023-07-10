const mongoose = require("mongoose")
const JWT = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        // select: false
    },
    confirmPassword: {
        type: String,
        required: true,
        // select: false
    }
}, { timestamps: true })

userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            { id: this._id, email: this.email },
            process.env.SECRET,
            { expiresIn: '10hr' }
        )
    }
}

module.exports = mongoose.model("User", userSchema)