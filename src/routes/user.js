const express = require("express")
const { findByIdAndDelete } = require("../models/user")
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.get("/users", async (req, res) => {
    try{
        const user = await User.find({})

        if(!user) {
            return res.status(404).send()
        }
        
        res.status(200).send(user)

        const countUsers = await User.countDocuments()
        console.log(countUsers);

    }catch(e) {
        res.status(500).send(e)
    }
})

router.get("/users/:id", async (req, res) => {
    try{
        const _id = req.params.id
        
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e) {
        res.status(500).send(e)
    }
})

// router.patch("/users/:id", async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'password','age','email']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if(!isValidOperation){
//         return res.status(404).send("Invalid input field")
//     }

//     try{
//         const _id = req.params.id
//         const user = await User.findById(_id)
//         user.forEach((update) => usr[update] = req.body[update]);
//         await user,save()
//         if(!user){
//             return res.status(404),send()
//         }
//         res.status(201).send(user)
//     }catch(e) {
//         res.status(500).send()
//     }
// })


router.delete("/users/:id", async (req, res) => {
    try{
        const _id = req.params.id
        
        const user = await User.findByIdAndDelete(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e) {
        res.status(500).send(e)
    }
})


module.exports = router