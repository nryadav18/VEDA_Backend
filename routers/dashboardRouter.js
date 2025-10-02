const express = require('express');
const Router = express.Router();

const dashboardController = require('../controllers/dashboardController');

Router.get('/api/total-reg-in-each-dept', dashboardController.totalRegEachDept);
Router.get('/api/get-user-data-for-table', dashboardController.dataForTable); //admin table regarding event and department details // 3rd chart and 5th table
Router.get('/api/get-campus-years/:user', dashboardController.getCampusYearsReg); //optional
Router.get('/api/get-chart-data/:department', dashboardController.Chart1); //optional
Router.get('/api/get-user-years/:user', dashboardController.getUserYears); //1st
Router.get('/api/get-campus-count/:user', dashboardController.campusCount); //2nd 4th chart
Router.get('/api/get-gender-count/:user', dashboardController.GenderCount); //6th pie chart for total gender count
Router.get('/api/get-accomodations-count/:user', dashboardController.AccomodationGenderCount); //7th accomodation count
Router.get('/api/get-campus-wise-gender-count/:user', dashboardController.Campuswisegender); //8th campus gender bar chart
Router.get('/api/get-each-team-deptwise/:department', dashboardController.getEachTeamCount);

// newww
Router.get('/api/get-gender-count-auth/:department', dashboardController.getGenderCount);
Router.get('/api/get-accomodation-data/:department', dashboardController.getAccomodation);
Router.get('/api/get-campu-gender-data/:department', dashboardController.getCampusGender);
Router.get('/api/get-revenue/:department', dashboardController.getRevenue);
Router.get('/api/get-payment-details/:department', dashboardController.getpaymentdetails);
Router.get('/api/get-other-college-data/:department', dashboardController.otherCollegePaymentdetails);
module.exports = Router;