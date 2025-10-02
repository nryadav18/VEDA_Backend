
const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');

Router.post('/add-user', userController.addUser);
// Router.get('/api/get-user-years', userController.getUserYears);


module.exports = Router;
