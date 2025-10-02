
// import mongoose from "mongoose";
const mongoose = require("mongoose");

const facultyCodSchema = mongoose.Schema({
    departmentName:{
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    cordinatorImage: {
        type: String,
        required: true
    },
    cordinatorName: {
        type: String,
        required: true
    },
    cordinatorId: {
        type: String,
        required: true,
    },
    cordinatorCollege: {
        type: String,
        required: true,
    },
    cordinatorPhone: {
        type: Number,
        required: true
    },
    cordinatorEmail: {
        type : String,
        required : true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true,        
    },
    updatedAt: {
        type: String,
        required: true,        
    }
})

module.exports = mongoose.model('facultyCodSchema',facultyCodSchema);