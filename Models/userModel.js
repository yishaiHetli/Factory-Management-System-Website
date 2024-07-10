const mongoose = require("mongoose")

const usersScheme= new mongoose.Schema({
    id:Number,
    "full name":String,
    "num of action":Number
},{versionKey:false})

module.exports = mongoose.model("user", usersScheme)