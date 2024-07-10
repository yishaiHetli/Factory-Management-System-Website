const express = require("express")
const router = express.Router()
const employeesService = require("../Services/employeesService")
const assignmentsService = require("../Services/assignmentsService")
const jwt = require("jsonwebtoken")

module.exports = router
router.get("/", async (req, res) => {
    const assignments = await assignmentsService.getAll()
    const employees = await employeesService.getAll()
    const assignmentWithEmployee =  assignments.map((assignment) => {
        const employeeName = employees.find((employee) => employee._id == assignment.employeeId)
        return {
            ...assignment._doc,
            employeeName: `${employeeName['first name']} ${employeeName['last name']}`
        }
    })
    return res.status(200).json(assignmentWithEmployee)
})
router.get("/:id",  async (req, res) => {
    const id = req.params.id
    const assignment = await assignmentsService.getById(id)
    if (assignment.found) return res.status(200).json(assignment.assignment)
    return res.status(400).json(assignment.msg)
})
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const newData = req.body
    Object.keys(newData).forEach(key => {
        if (newData[key] == "") Object.keys(newData).pop(key)
    });
    const assignment = await assignmentsService.update(id, newData)
    if (assignment.found) return res.status(200).json(assignment.msg)
    return res.status(400).json(assignment.msg)
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
        const assignment = await assignmentsService.create(newData)
        if (assignment.found) return res.status(200).json(assignment.msg)
        return res.status(400).json(assignment.msg)
    }
})
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const assignment = await assignmentsService.delete_object(id)
    if (assignment.found) return res.status(200).json(assignment.msg)
    return res.status(400).json(assignment.msg)
})
