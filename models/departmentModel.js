
// import mongoose from "mongoose";
const mongoose = require("mongoose");

const departments = new mongoose.Schema({
    departmentName:{
        type: String,
        required: true,
    },
    departmentImage: {
        type: String,
        required: true,
    },
    departmentLogo:{
        type: String,
        required: true,
    },
    departmentTitle: {
        type: String,
        required: true,
    },
    departmentContent: {
        type: String,
        required: true,
    }
}); 

module.exports = mongoose.model('departments', departments);