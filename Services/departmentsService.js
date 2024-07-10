const departmentModel = require("../Models/departmentModel")

function getAll() {
    return departmentModel.find({})
}

async function getById(id) {
    try {
        const department = await departmentModel.findById(id)
        return { found: true, department: department }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}

async function update(id, newData) {
    try {
        await departmentModel.findByIdAndUpdate(id, newData)
        return { found: true, msg: "updated successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
async function create(newData) {
    try {
        await departmentModel.create(newData)
        return { found: true, msg: "added successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
async function delete_object(id) {
    try {
        await departmentModel.findByIdAndDelete(id)
        return { found: true, msg: "deleted successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
module.exports = { create, delete_object, getAll, getById, update }
