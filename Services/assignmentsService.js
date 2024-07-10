const assignmentsModel = require("../Models/assignmentsModel")

function getAll() {
    return assignmentsModel.find({})
}

async function getById(id) {
    try {
        const assignment = await assignmentsModel.findOne({
            $or: [
                { employeeId: id },
                { _id: id }
            ]
        })

        return { found: true, assignment: assignment }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}


async function update(id, newData) {
    try {

        const assignment = await assignmentsModel.findOneAndUpdate({
            $or: [
                { employeeId: id },
                { _id: id }
            ]
        }, newData)
        return { found: true, msg: "updated successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
async function create(newData) {
    try {
        await assignmentsModel.create(newData)
        return { found: true, msg: "added successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
async function delete_object(id) {
    try {
        await assignmentsModel.findByIdAndDelete(id)
        return { found: true, msg: "deleted successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
module.exports = { create, delete_object, getAll, getById, update }
