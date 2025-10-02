const express = require('express');
const Router = express.Router();

const PaymentsControllers = require('../controllers/paymentsController');


Router.post('/api/generate-order' ,PaymentsControllers.generateOrder);
Router.post('/api/make-payment' ,PaymentsControllers.addPayment);
module.exports = Router;
