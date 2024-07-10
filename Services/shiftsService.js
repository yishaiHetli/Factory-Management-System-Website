const shiftsModel = require("../Models/shiftsModel")

function getAll() {
    return shiftsModel.find({})
}

async function getById(id) {
    try {
        const shift = await shiftsModel.findById(id)
        return { found: true, shift: shift }
    } catch (e) {
        return { found: true, msg: e.msg }
    }
}

async function update(id, newData) {
    try {
        await shiftsModel.findByIdAndUpdate(id, newData)
        return { found: true, msg: "updated successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
async function create(newData) {
    try {
        await shiftsModel.create(newData)
        return { found: true, msg: "added successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
async function delete_object(id) {
    try {
        await shiftsModel.findByIdAndDelete(id)
        return { found: true, msg: "deleted successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
module.exports = { create, delete_object, getAll, getById, update }
