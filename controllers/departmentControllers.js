const departments = require('../models/departmentModel');
const path = require('path');
const fs = require('fs');
const eventSchema = require('../models/events.js');

// Get Department Data
const getDepartmentData = async (req, res) => {
  try {
    const result = await departments.find({});
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ state: err, message: 'There is an error in fetching department data' });
  }
};

// Add Department
const addDepartment = async (req, res) => {
  try {
    console.log(req.body); // Ensure the body is available

    const departmentLogoFile = req.files['departmentLogo'] ? req.files['departmentLogo'][0].filename : null;
    const departmentImageFile = req.files['departmentImage'] ? req.files['departmentImage'][0].filename : null;

    // Construct a new department object with the required fields
    const newDepartment = {
      departmentName: req.body.departmentName,
      departmentTitle: req.body.departmentTitle,
      departmentContent: req.body.departmentContent,
      departmentLogo: departmentLogoFile,  // Save only the filename
      departmentImage: departmentImageFile // Save only the filename
    };

    // Insert the new department data into the database
    const result = await departments.insertMany(newDepartment);

    return res.status(201).json({ message: 'Department data added successfully', data: result });
  } catch (err) {
    console.error('Error in adding department data:', err);
    return res.status(400).json({ state: err, message: 'There is an error in adding department data' });
  }
};

// Get Department Header
const getDepartmentHeader = async (req, res) => {
  const dept = req.params.department;
  try {
    const result = await departments.find({ departmentName: dept });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ state: err, message: 'There is an error in getting department data' });
  }
};

// Edit Department
const editDepartment = async (req, res) => {
  console.log("ed",req.body)
  const dept = req.params.department;
  console.log('Editing department:', dept);
  console.log('Received files:', req.files); // Debugging line to check files
  console.log('Received body:', req.body); // Debugging line to check body data
  console.log(dept, dept.length)
  try {
    const exist = await departments.findById(dept);
    if (!exist) {
      return res.status(404).json({ message: 'Department data not found' });
    }

    let departmentLogoFile = exist.departmentLogo;
    let departmentImageFile = exist.departmentImage;

    if (req.files && req.files['departmentLogo']) {
      departmentLogoFile = req.files['departmentLogo'][0].filename;
    }

    if (req.files && req.files['departmentImage']) {
      departmentImageFile = req.files['departmentImage'][0].filename;
    }

    const updatedData = {
      ...req.body,
      departmentLogo: departmentLogoFile,
      departmentImage: departmentImageFile,
    };

    const result = await departments.updateOne({ "_id": dept }, { $set: updatedData });
    console.log(result)
    return res.status(200).json({ message: 'Department data updated successfully', result });
  } catch (error) {
    console.error('Error updating department data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



// Delete Department
const deleteDepartment = async (req, res) => {
  const dept = req.params.department;
  console.log("iasdfasdfads",dept)
  console.log(dept)
  try {
    const exist = await departments.findById(dept);
    if (exist) {
      await departments.deleteOne({ "_id": dept });
      return res.status(200).json({ message: 'Department data deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Department data not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Unique Departments
const getUniqueDepartments = async (req, res) => {
  try {
    const uniqueDepartmentNames = await departments.distinct('departmentName');
    return res.status(200).json(uniqueDepartmentNames);
  } catch (error) {
    console.error('Error fetching unique department names:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getDepartmentsWithEvents = async (req, res) => {
  try {
    const events = await eventSchema.find();
    
    const eventsByDepartment = events.reduce((acc, event) => {
      if (!acc[event.departmentName]) {
        acc[event.departmentName] = [];
      }
      acc[event.departmentName].push(event);
      return acc;
    }, {});

    res.json(eventsByDepartment);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
  addDepartment,
  getDepartmentData,
  getDepartmentHeader,
  editDepartment,
  deleteDepartment,
  getUniqueDepartments,
  getDepartmentsWithEvents
};
