require("../db/mongoose")
const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    completion: {
        default: false,
        type: String
    },
    task: {
        required: true,
        type: String
    }
})

const Task = mongoose.model(" Task", taskSchema)

module.exports = Task