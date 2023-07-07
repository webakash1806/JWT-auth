const mongoose = require("mongoose")

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
    },
    confirmPassword: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            { id: this.id, email: this.email },
            process.env.SECRET,
            { expiresIn: '24hr' }
        )
    }
}

module.exports = mongoose.model("User", userSchema)