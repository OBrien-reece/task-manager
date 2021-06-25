const User = require("../models/user")
const express = require("express")
const auth = require("../middleware/auth")
const router = new express.Router()

router.post("/users", async (req, res) => {
	try{

		const user = new User(req.body)	

		const token = await user.generateAuthToken()

		await user.save()

		res.status(201).send({ user, token })

	}catch(e) {

		res.status(404).send()

	}
})

router.post("/users/login", async (req, res) => {

	try{

		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()

		res.status(200).send({ user, token })

	}catch(e) {

		res.status(500).send(e)
	}
})

router.get("/users/me", auth, async (req, res) => {
	res.send(req.user)
})

router.patch("/users/me", auth, async (req, res) => {

	const updates = Object.keys(req.body)
	const allowedUpdates = ['name','age','password','email']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if(!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates"})
	}

	try{

		// const user = await User.findById(req.params.id)
		// console.log(user)

		updates.forEach((update) => req.user[update] = req.body[update])

		await req.user.save()

		res.status(201).send(req.user)

	}catch(e) {

		res.status(500).send(e)
	}
})

router.post("/users/logout", auth, async (req, res) => {

	try{

		req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)

		await req.user.save()

		res.status(200).send(req.user)

	}catch(e) {

		res.status(500).send()
	}
})

router.post("/users/logoutAll", auth, async (req, res) => {

	try{

		req.user.tokens = []

		await req.user.save()

		res.send()

	}catch(e) {

		res.status(500).send(e)
	}
})

module.exports = router