
const mongoose = require("mongoose");

const studentCodSchema = new mongoose.Schema({
    departmentName:{
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    studentCordinatorName: {
        type: String,
        required: true
    },
    studentCordinatorId: {
        type: String,
        required: true,
    },
    studentCordinatorCollege: {
        type: String,
        required: true,
    },
    studentCordinatorPhone: {
        type: Number,
        required: true
    },
    studentCordinatorEmail: {
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

module.exports = mongoose.model('studentCodSchema',studentCodSchema);