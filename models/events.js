
// import mongoose from "mongoose";
const mongoose = require("mongoose");


const eventSchema = mongoose.Schema({

    departmentName: {
        type : String,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    eventOverview:{
        type: String,
        required: true,
    },
    rulesAndRegulations:{
        type: Array, // Array
        required: true,
    },
    eventVenue: {
        type: String,
        required: true,
    },
    registrationFee: {
        type: Number,
        required: true,
    },
    maxTeamSize: {
        type: Number,
        required: true
    },
    extraTeamSize: {
        type: Number,
        required: true,
    },
    extraAmountPerHead: {
        type: Number,
        required: true,
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


module.exports = mongoose.model('eventSchema',eventSchema);



