
// import mongoose from "mongoose";
const mongoose = require("mongoose");


const paymentSchema = mongoose.Schema({

    razorpay_payment_id:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    teamCode:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    eventName:{
        type:String,
        required:true
    },
    departmentName:{
        type:String,
        required:true
    },
    createdAt: {
        type: String,
        required: true
    },
})


module.exports = mongoose.model('paymentSchema',paymentSchema);



