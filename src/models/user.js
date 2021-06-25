const express = require("express")
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
	name:{
		required: true,
		trim: true,
		type: String
	},
	age: {
		default: 0,
		trim: true,
		type: Number,
		validate(value){
			if(value < 0){
				throw new Error("Age cannot be less than be negative")
			}
		}
	},
	email: {
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		type: String,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error("Please correct your email details")
			}
		}
	},
	password: {
		required: true,
		trim: true,
		type: String,
		minLength: 8,
		validate(value){
			if(value.toLowerCase().includes("password")){
				throw new Error("Password cannot contain password")
			}
		}		
	},
	tokens: [{
		token: {
			required: true,
			type: String
		}
	}]
})

userSchema.methods.toJSON =  function () {

	const user = this

	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens

	return userObject
}

userSchema.methods.generateAuthToken = async function () {

	const user = this

	const jwtSecrete = "guessiwoulddieforyoubaby"

	const token = await jwt.sign({ _id: user._id.toString() }, jwtSecrete)

	user.tokens = user.tokens.concat({ token: token })

	await user.save()

	return token
}

userSchema.statics.findByCredentials = async function (email, password) {

	const user = await User.findOne({ email: email })

	if(!user) {
		throw new Error("Invalid login details")
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if(!isMatch) {
		throw new Error("Invalid login details")
	}

	return user
}

userSchema.pre("save", async function (next) {

	const user = this

	if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()
})

const User = mongoose.model("User", userSchema)

module.exports = User