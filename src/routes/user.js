const User = require("../models/user")
const express = require("express")
const router = new express.Router()

router.post("/users", async (req, res) => {
	try{

		const user = new User(req.body)

		const token = await user.generateAuthToken()

		await user.save()

		res.status(201).send({ user, token})

	}catch(e) {
		res.status(500).send(e.message)
	}
})

router.get("/users/login", async (req, res) => {
	try{

	const userlogin = await User.findByCredentials(req.body.email, req.body.password)

	const token = await userlogin.generateAuthToken()

	res.send(userlogin)

    }catch(e) {
    	res.status(500).send(e.message)
    }
})

module.exports = router