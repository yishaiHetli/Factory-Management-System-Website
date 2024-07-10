const express = require("express")
const router = express.Router()
const shiftsService = require("../Services/shiftsService")

module.exports = router
router.get("/", async (req, res) => {
    const shift = await shiftsService.getAll()
    return res.status(200).json(shift)
})
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const shift = await shiftsService.getById(id)
    if (shift.found) return res.status(200).json(shift.shift)
    return res.status(400).json(shift.msg)
})
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const newData = req.body
    Object.keys(newData).forEach(key => {
        if (newData[key] == "") Object.keys(newData).pop(key)
    });
    const shift = await shiftsService.update(id, newData)
    if (shift.found) return res.status(200).json(shift.msg)
    return res.status(400).json(shift.msg)
})
router.post("/", async (req, res) => {
    let valid = true
    const newData = req.body
    Object.keys(newData).forEach(key => {
        if (newData[key] == "") {
            valid = false
            return res.status(400).json({ msg: `field ${key} cannot be empty` })
        }
    });
    if (valid) {
        const shift = await shiftsService.create(newData)
        if (shift.found) return res.status(200).json(shift.msg)
        return res.status(400).json(shift.msg)
    }
})
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const shift = await shiftsService.delete_object(id)
    if (shift.found) return res.status(200).json(shift.msg)
    return res.status(400).json(shift.msg)
})
