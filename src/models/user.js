const mongoose = require("mongoose")
const validator = require("validator")
require('../db/mongoose')
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Input a valid E-Mail")
            }
        }
    },
    age: {
        default: 0,
        type: Number,
        validate(value) {
            if(value < 0){
                throw new Error("Age is not eligible")
            }
        }
    },
    password: {
        required: true,
        type: String,
        minLength: 8,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error("Password cannot contain password")
            }
        }
    }
})

userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User