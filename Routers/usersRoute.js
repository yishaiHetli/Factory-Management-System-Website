const express = require("express")
const router = express.Router()
const usersService = require("../Services/usersService")

module.exports = router
router.get("/", async (req, res) => {
    const user = await usersService.getAll()
    return res.status(200).json(user)
})
router.get("/:id", async (req, res) => {
    const id = req.params.id 
    const user = await usersService.getById(id)
    if (user.found) return res.status(200).json(user.user)
    return res.status(400).json(user.msg)
})