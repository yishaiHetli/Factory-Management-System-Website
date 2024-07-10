const mongoose = require("mongoose")

const employeesScheme = new mongoose.Schema({
    "first name": String,
    "last name": String,
    "start work year": String,
    departmentID: String
},{versionKey:false})

module.exports = mongoose.model("employee", employeesScheme)