
const payments = require('../models/payments');
require('dotenv').config();
const Razorpay = require("razorpay")

const generateOrder = async (req, res, next) => {
    console.log(req.body.amount)
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID ,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      const options = {
        amount: req.body.amount*100,
        currency: "INR",
        receipt: "receipt_order_" + Math.floor(Math.random() * 1000000),
      };
   
      const order = await razorpay.orders.create(options);
      console.log(order)
      if (!order) return res.status(500).send("Some error occured");
      console.log(order)
      const order_response = {
        order_id: order.id,
        currency: order.currency,
        amount: order.amount
      }
      return res.status(200).send(order_response)
   
    } catch (error) {
        console.log(error)
      res.status(500).send(error);
    }
  }


const addPayment = async(req,res,next) => {
    console.log(req.body)
    try{
        const data = await payments.insertMany(req.body)
        return res.status(200).send({"Message":"Created Successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}


exports.generateOrder = generateOrder;
exports.addPayment = addPayment;