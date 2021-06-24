const express = require("express")
const userRouter = require("./routes/user")
require("./db/mongodb")

const app = express()

app.use(express.json())
app.use(userRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log("Server is running on port " + port)
})