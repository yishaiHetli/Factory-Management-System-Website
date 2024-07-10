const mongoose = require("mongoose")

const assignmentsScheme= new mongoose.Schema({
    shiftId:String,
    employeeId:String
}, {versionKey:false})

module.exports = mongoose.model("assignment", assignmentsScheme)