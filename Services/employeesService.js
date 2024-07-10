const employeesModel = require("../Models/employeeModel")

function getAll() {
    return employeesModel.find({})
}

async function getById(id) {
    try {
        const employee = await employeesModel.findById(id)
        return { found: true, employee: employee.toObject() }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}

async function update(id, newData) {
    try {
        await employeesModel.findByIdAndUpdate(id, newData)
        return { found: true, msg: "updated successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
async function create(newData) {
    try {
        await employeesModel.create(newData)
        return { found: true, msg: "added successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
async function delete_object(id) {
    try {
        await employeesModel.findByIdAndDelete(id)
        return { found: true, msg: "deleted successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
module.exports = { create, delete_object, getAll, getById, update }
