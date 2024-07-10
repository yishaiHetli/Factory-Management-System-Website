const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const jsUtils = require("jsonfile")
const path = require("path")

const filePath = path.join(__dirname, "../json/actions.json")
module.exports = router

router.get("/", async (req, res) => {
    const {actions} = await jsUtils.readFile(filePath)
    return res.status(200).json(actions)

})

router.get("/:id", async (req, res) => {
    const {actions} = await jsUtils.readFile(filePath)
    const id = req.params.id
    const date = new Date
    const fullDate = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
    let user = actions.find(user => user.id == id)

    if (user.date == fullDate) {
        if (user.actionsAllowd > 0) {
            user.actionsAllowd -= 1
            const newList = actions.filter((user) => user.id != id)
            newList.push(user)
            await jsUtils.writeFile(filePath, { actions: newList })
            return res.status(200).json("success")
        }
        else {
            return res.status(401).json("you maxed your action for today")
        }
    }
    else {
        user.date = fullDate
        user.actionsAllowd = user.maxActions - 1
        const newList = actions.filter((user) => user.id != id)
        newList.push(user)
        await jsUtils.writeFile(filePath, { actions: newList })
        return res.status(200)
    }
})