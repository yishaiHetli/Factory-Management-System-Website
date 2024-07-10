const mongoose = require("mongoose")

const departmentsScheme= new mongoose.Schema({
    name:String,
    manager:String
},{versionKey:false})

module.exports = mongoose.model("department", departmentsScheme)