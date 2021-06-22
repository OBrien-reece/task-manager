require("./db/mongoose")
const express = require('express')
const userRoute = require("./routes/user")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRoute)

app.listen(port, () => {
    console.log("Server running on port " + port);
})
