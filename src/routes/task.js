const express = require("express")
const Task = require("../models/task")
const router = new express.Router()

router.post('/task', (req, res) => {
    console.log(req.body);
    res.send("Test")
})

module.exports = router