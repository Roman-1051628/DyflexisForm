const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
    }
}, {
    versionKey: false,
}
);

//static signup method
userSchema.statics.signup = async function(name, password, email) {

    //validating email
    if (!name || !password || !email) {
        throw Error("All fields are required.")
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough")
    }

    const nameexists = await this.findOne({ name })
    const emailexists = await this.findOne({ email })

    if (nameexists) {
        throw Error("Name already exists")
    } else if (emailexists) {
        throw Error("Email already exists")
    }

    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await this.create({ name, password: hashedPassword, email, role: "user" })

    return newUser
}

//static login method
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error("All fields are required.")
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Incorrect email or password")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw Error("Incorrect email or password")
    }

    return user

}

const userModel = mongoose.model("users", userSchema)
module.exports = userModel