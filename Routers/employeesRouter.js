const express = require("express")
const router = express.Router()
const employeesService = require("../Services/employeesService")
const shiftsService = require("../Services/shiftsService")
const assignmentsService = require("../Services/assignmentsService")
const jwt = require("jsonwebtoken")

module.exports = router
router.get("/", async (req, res) => {
    const employees = await employeesService.getAll()
    const assignments = await assignmentsService.getAll()
    const employeesList =  employees.map((employee) => {
        return {
            ...employee._doc,
            assignment: assignments.find((assignment) => assignment.employeeId == employee._id) 
        }
    })
    return res.status(200).json(employeesList)
})
router.get("/:id", async (req, res) => {
    const id = req.params.id
    let employee = await employeesService.getById(id)
    employee = employee.employee
    const assignments = await assignmentsService.getAll()
    employee.assignment = assignments.find((assignment) => assignment.employeeId == id)
    return res.status(200).json(employee)
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const newData = req.body
    Object.keys(newData).forEach(key => {
        if (newData[key] == "") Object.keys(newData).pop(key)
    });
    const employee = await employeesService.update(id, newData)
    if (employee.found) return res.status(200).json(employee.msg)
    return res.status(400).json(employee.msg)
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
        const employee = await employeesService.create(newData)
        if (employee.found) return res.status(200).json(employee.msg)
        return res.status(400).json(employee.msg)
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const employee = await employeesService.delete_object(id)
    if (employee.found) return res.status(200).json(employee.msg)
    return res.status(400).json(employee.msg)
})

