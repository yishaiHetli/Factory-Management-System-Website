const userModel = require("../Models/userModel")

function getAll() {
    return userModel.find({})
}

async function getById(id) {
    try {
        const user = await userModel.findById(id)
        return { found: true, user: user }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}

async function update(id, newData) {
    try {
        await userModel.findByIdAndUpdate(id, newData)
        return { found: true, msg: "updated successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
async function create(newData) {
    try {
        await userModel.create(newData)
        return { found: true, msg: "added successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
async function delete_object(id) {
    try {
        await userModel.findByIdAndDelete(id)
        return { found: true, msg: "deleted successfuly" }
    } catch (e) {
        return { found: false, msg: e.msg }
    }
}
module.exports = { create, delete_object, getAll, getById, update }
