const express = require('express');
const Router = express.Router();

const studentCordController = require('../controllers/studentCordinatorControllers');

Router.post('/api/add-student-cordinate', studentCordController.addStudentCordinatesTo);
Router.put('/api/edit-student-cordinate', studentCordController.editingCordinate);
Router.delete('/api/delete-student-cordinate/:id', studentCordController.deleteCordinate);
Router.get('/api/get-student-cordinate', studentCordController.getCordinateData);
Router.get(
    "/api/get-student-cordinate-by-event-dept/:department/:event",
    studentCordController.getCordianteDataByEventAndDept
  );

module.exports = Router;
