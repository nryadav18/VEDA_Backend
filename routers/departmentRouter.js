// departmentRouter.js

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const departmentControllers = require('../controllers/departmentControllers');
const Router = express.Router();

const departmentImagesDir = path.join(__dirname, '..', 'public', 'Department_Images');

// Ensure the directory exists
if (!fs.existsSync(departmentImagesDir)) {
  fs.mkdirSync(departmentImagesDir, { recursive: true });
}

// Temporary storage for multer to handle uploads first
const tempStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, departmentImagesDir);
  },
  filename: function (req, file, cb) {
    // Save with a temporary filename first
    const tempFileName = `${Date.now()}_${file.originalname}`;
    cb(null, tempFileName);
  }
});

// Configure multer to handle file uploads
const upload = multer({ storage: tempStorage });

// Middleware to rename files after multer uploads
const renameFilesMiddleware = (req, res, next) => {
  if (!req.body.departmentName) {
    return res.status(400).json({ message: "Department name is required" });
  }

  const departmentName = req.body.departmentName.replace(/\s+/g, '_');

  if (req.files['departmentLogo']) {
    const departmentLogoFile = req.files['departmentLogo'][0];
    const logoExtension = path.extname(departmentLogoFile.originalname);
    const newLogoFileName = `${departmentName}_LOGO${logoExtension}`;
    fs.renameSync(departmentLogoFile.path, path.join(departmentImagesDir, newLogoFileName));
    req.files['departmentLogo'][0].filename = newLogoFileName;
  }

  if (req.files['departmentImage']) {
    const departmentImageFile = req.files['departmentImage'][0];
    const imageExtension = path.extname(departmentImageFile.originalname);
    const newImageFileName = `${departmentName}${imageExtension}`;
    fs.renameSync(departmentImageFile.path, path.join(departmentImagesDir, newImageFileName));
    req.files['departmentImage'][0].filename = newImageFileName;
  }

  next();
};

// Route definitions
Router.get('/api/get-department-data', departmentControllers.getDepartmentData);
Router.post(
  '/api/add-department-data',
  upload.fields([{ name: 'departmentLogo' }, { name: 'departmentImage' }]),
  renameFilesMiddleware,
  departmentControllers.addDepartment
);
Router.get('/api/get-department-header/:department', departmentControllers.getDepartmentHeader);
// Router.put('/api/edit-department/:department', departmentControllers.editDepartment);
Router.put(
  '/api/edit-department/:department',
  upload.fields([{ name: 'departmentLogo' }, { name: 'departmentImage' }]),  // Middleware to handle file uploads
  renameFilesMiddleware, // Middleware to handle renaming of files
  departmentControllers.editDepartment
);
Router.delete('/api/delete-department/:department', departmentControllers.deleteDepartment);
Router.get('/api/get-unique-departments', departmentControllers.getUniqueDepartments);
Router.get('/api/get-departments-with-events', departmentControllers.getDepartmentsWithEvents);

module.exports = Router;
