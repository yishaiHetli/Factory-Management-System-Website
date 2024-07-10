const mongoose = require("mongoose")

const shiftsScheme= new mongoose.Schema({
    date:String,
    "starting hour":String,
    "ending hour":String
},{versionKey:false})

module.exports = mongoose.model("shift", shiftsScheme)