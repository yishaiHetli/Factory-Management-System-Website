const express = require("express")
const router = express.Router()
const departmentService = require("../Services/departmentsService")
const jwt = require("jsonwebtoken")


module.exports = router
router.get("/", async (req, res) => {
    const department = await departmentService.getAll()
    return res.status(200).json(department)
})
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const department = await departmentService.getById(id)
    if (department.found) return res.status(200).json(department.department)
    return res.status(400).json(department.msg)
})
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const newData = req.body
    Object.keys(newData).forEach(key => {
        if (newData[key] == "") Object.keys(newData).pop(key)
    });
    const department = await departmentService.update(id, newData)
    if (department.found) return res.status(200).json(department.msg)
    return res.status(400).json(department.msg)
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
        const department = await departmentService.create(newData)
        if (department.found) return res.status(200).json(department.msg)
        return res.status(400).json(department.msg)
    }
})
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const department = await departmentService.delete_object(id)
    if (department.found) return res.status(200).json(department.msg)
    return res.status(400).json(department.msg)
})
