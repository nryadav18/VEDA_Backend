const express = require('express');
const Router = express.Router();
const adminLoginControllors = require('../controllers/adminLoginControllers');


Router.post('/api/get-admin-login', adminLoginControllors.getAdmin);

module.exports = Router;
