const mongoose = require('mongoose')
const connectionUrl = "mongodb://127.0.0.1:27017/task-manager-project"

mongoose.connect(connectionUrl, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false
})

