const facultyCodSchema = require('../models/facultyCordinatersModel.js');
const path = require('path');
const fs = require('fs');

// Data insertion
const addFacultyCordintesTo = async (req, res) => {
    try {
        const CordinatorImageFile = req.files['cordinatorImage'] ? req.files['cordinatorImage'][0].filename : null;
        const newCordinator = {
            departmentName: req.body.departmentName,
            eventName: req.body.eventName,
            cordinatorName: req.body.cordinatorName,
            cordinatorImage: CordinatorImageFile,  // Save only the filename
            cordinatorId: req.body.cordinatorId,
            cordinatorCollege: req.body.cordinatorCollege,
            cordinatorPhone: req.body.cordinatorPhone,
            cordinatorEmail: req.body.cordinatorEmail,
            createdBy: 'DSP',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const result = await facultyCodSchema.create(newCordinator);
        return res.status(201).json({ message: 'Coordinator data added successfully', data: result });
    } catch (err) {
        console.error('Error in adding faculty coordinator data:', err);
        return res.status(400).json({ state: err, message: 'There is an error in adding coordinator data' });
    }
};

// Data fetching and updating
const editingCordinate = async (req, res) => {
    const { cordinatorId } = req.body;
    console.log(req.body._id)
    try {
        const existingCoOrdinate = await facultyCodSchema.findById(req.body._id);
        if (existingCoOrdinate) {
            if (req.files['cordinatorImage']) {
                const oldImagePath = path.join(__dirname, "..", "public", "Faculty_Images", existingCoOrdinate.cordinatorImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            const updatedCordinator = {
                departmentName: req.body.departmentName,
                eventName: req.body.eventName,
                cordinatorName: req.body.cordinatorName,
                cordinatorImage: req.files['cordinatorImage'] ? req.files['cordinatorImage'][0].filename : existingCoOrdinate.cordinatorImage,
                cordinatorId: req.body.cordinatorId,
                cordinatorCollege: req.body.cordinatorCollege,
                cordinatorPhone: req.body.cordinatorPhone,
                cordinatorEmail: req.body.cordinatorEmail,
                updatedAt: new Date()
            };
            await facultyCodSchema.updateOne({"_id":req.body._id}, updatedCordinator);
            res.status(200).json({ message: 'Coordinator data updated successfully' });
        } else {
            return res.status(404).json({ message: 'Coordinator data not found' });
        }
    } catch (error) {
        console.error('Error updating coordinator data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Data fetching and deleting
const deleteCordinate = async (req, res) => {
    const cordinatorId  = req.params.cordinatorId;
    console.log(cordinatorId)
    try {
        const existingCoOrdinate = await facultyCodSchema.findById(cordinatorId);
        if (existingCoOrdinate) {
            const imagePath = path.join(__dirname, "..", "public", "Faculty_Images", existingCoOrdinate.cordinatorImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
            await facultyCodSchema.deleteOne({"_id": cordinatorId });
            return res.status(200).json({ message: 'Data deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Data not found' });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Data get
const getCordianteData = async (req, res) => {
    try {
        const cordinateData = await facultyCodSchema.find({});
        return res.status(200).json(cordinateData);
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ message: 'Error fetching data' });
    }
}


const getCordianteDataByEventAndDept = async (req, res) => {
    const dept = req.params.department;
    const event = req.params.event;

    try {
        const cordinateData = await facultyCodSchema.find({departmentName:dept, eventName:event});
        return res.status(200).json(cordinateData);
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ message: 'Error fetching data' });
    }
}
exports.addFacultyCordintesTo = addFacultyCordintesTo;
exports.editingCordinate = editingCordinate;
exports.deleteCordinate = deleteCordinate;
exports.getCordianteData = getCordianteData;
exports.getCordianteDataByEventAndDept = getCordianteDataByEventAndDept;
