const User = require("../models/user")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {

	try{
        const jwtSecrete = "guessiwoulddieforyoubaby" 

		const token = req.header("Authorization").replace("Bearer ", '')	 
		const decoded = jwt.verify(token, jwtSecrete)
		console.log(decoded)
		console.log(token)
		const user = await User.findOne({_id: decoded._id, "tokens.token": token})

		if(!user) {
			throw new Error("Please try again")
		}

		req.user = user
		req.token = token
		next()

	}catch(e) {

		res.status(401).send({ error: "Please aunthenticate" })
	}
}

module.exports = auth

