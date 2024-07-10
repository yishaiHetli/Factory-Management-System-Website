const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

module.exports = router

router.post("/", async (req, res) => {
    const users = await (await axios.get("https://jsonplaceholder.typicode.com/users")).data
    for (const item of users) {
        if (req.body.username == item.username && req.body.emile == item.emile) {
            const token = jwt.sign({ username: req.body.username, emile: req.body.emile }, "securityKey")
            return res.status(200).json({ token: token, name: item.name })
        }
        return res.status(401).json({ msg: "username not register" })
    }

})