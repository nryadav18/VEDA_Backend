const studentCodSchema = require('../models/studentCordinatorsModel.js');

// data insertions

const addStudentCordinatesTo = async (req,res) => {
    console.log(req.body)
    try {
        const result = await studentCodSchema.insertMany(req.body);
        return res.status(201).json({ message: 'co-dinates data added' });
    } catch (err) {
        return res.status(400).json({ state: err, message: 'There is an error in adding co-ordinate data' });
    }
}



//  data fetchings and updating

// const editingCordinate = async (req,res) => {
//     const { cordinatorId } = req.body;
//     try {
//         const existingCoOrdinate = await studentCodSchema.findOne({ cordinatorId });
//         if (existingCoOrdinate) {
//             await studentCodSchema.updateOne({ cordinatorId }, req.body);
//             res.status(200).json({ message: 'co-ordinate data updated successfully' });
//         } else {
//             return res.status(404).json({ message: 'co-ordinate data not found' });
//         }
//     } catch (error) {
//         console.error('Error upadting co-ordinate data:', error);
//         return res.status(500).json({message:'Internal server error'});
//     }
// }
const editingCordinate = async (req, res) => {
    const { id } = req.body;
    console.log(req.body)
    // Log incoming request and ID for debugging
    console.log('Request Body:', req.body);
    console.log('Finding Coordinator with ID:', id);
    
    studentCodSchema.findByIdAndUpdate(req.body.id, req.body)
    .then(result => {
        return res.status(200).json({
            message: 'Coordinator data updated successfully',
        });
    })
    .catch(err => {
        console.log(err)
        return res.status(404).json({
            message: 'Coordinator data not found'
        });
    })




    // try {
    //     // Ensure 'id' is a valid ObjectId

    //     // Update the document with the provided ID
    //     const updatedCoordinator = await studentCodSchema.findOneAndUpdate(
    //         { _id: req.body._id },
    //         req.body,
    //         { new: true, runValidators: true }
    //     );

    //     // Log the result for debugging
    //     console.log('Updated Coordinator:', updatedCoordinator);
        
    //     if (updatedCoordinator) {
    //         return res.status(200).json({
    //             message: 'Coordinator data updated successfully',
    //             data: updatedCoordinator
    //         });
    //     } else {
    //         return res.status(404).json({
    //             message: 'Coordinator data not found'
    //         });
    //     }
    // } catch (error) {
    //     // Log the error for debugging
    //     console.error('Error updating coordinator data:', error);
    //     return res.status(500).json({
    //         message: 'Error updating coordinator data',
    //         error: error.message
    //     });
    // }
};






// data fetching and deleting

const deleteCordinate = async (req,res) => {
    const studentCordinatorId = req.params.id;
    console.log(studentCordinatorId)
    try {
        const existingCoOrdinate = await studentCodSchema.findOne({studentCordinatorId });
        if (existingCoOrdinate) {
            await studentCodSchema.deleteOne({ studentCordinatorId });
            return res.status(200).json({ message: 'data deleted successfully' });
        } else {
            return res.status(404).json({ message: 'data not found' });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        return res.status(500).json({message: 'Internal server error' });
    }
}



// data get

const getCordinateData = async (req , res) => {
    try {
        const cordinateData = await studentCodSchema.find({});
        return res.status(200).json(cordinateData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message : 'Error fetching data'});
    }
}




const getCordianteDataByEventAndDept = async (req, res) => {
    const dept = req.params.department;
    const event = req.params.event;

    try {
        const cordinateData = await studentCodSchema.find({departmentName:dept, eventName:event});
        return res.status(200).json(cordinateData);
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ message: 'Error fetching data' });
    }
}


exports.addStudentCordinatesTo = addStudentCordinatesTo;

exports.editingCordinate = editingCordinate;

exports.deleteCordinate = deleteCordinate;

exports.getCordinateData = getCordinateData;
exports.getCordianteDataByEventAndDept = getCordianteDataByEventAndDept;
