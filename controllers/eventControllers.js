const eventSchema = require('../models/events.js');

// Get Event Data
const getEventData = async (req , res) => {
    const dept = req.params.department;
    try {
        const eventData = await eventSchema.find({departmentName:dept});
        return res.status(200).json(eventData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fecthing data'});
    }
}

// Get all events
const getAllEvents = async (req , res) => {
    try {
        const result = await eventSchema.find({});
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fecthing data' });
    }
}

// Add Events
const addEvents = async (req, res) => {
    try {
        console.log(req.body);
        const result = await eventSchema.insertMany(req.body);
        return res.status(201).json({ message: 'events data added' });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ state: err, message: 'There is an error in adding event data' });
    }
}

// Edit Event
const editEvent = async (req, res) => {
    const { eventName } = req.body;
    try {
        const existingEvent = await eventSchema.findOne({ eventName });
        if (existingEvent) {
            await eventSchema.updateOne({ eventName }, req.body);
            return res.status(200).json({ message: 'Event data updated successfully' });
        } else {
            return res.status(404).json({ message: 'Event data not found' });
        }
    } catch (error) {
        console.error('Error updating event data:', error);
        return res.status(500).json({message:'Internal server error'});
    }
};

// Delete Event
const deleteEvent = async (req, res) => {
    try {
        await eventSchema.findByIdAndDelete(req.body._id);
        return res.status(201).json({mesasge:'data deleted successfully'});
    } catch (error) {
        console.error('Error deleting data:', error);
        return res.status(500).json({message:'Internal server error'});
    }
};

// Get Data By Event Name
const getEventByName = async (req , res) => {
    const department = req.params.department;
    const eventname = req.params.eventname;
    console.log(department+ " " + eventname);
    try {
        const result = await eventSchema.find({ eventName : eventname, departmentName: department});
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ state: err, message: 'There is an error in getting event data' })
    }
}

// edit event by dept and event
const editingEvent = async(req,res) => {
    console.log(req.body._id)
    // const {eventName , departmentName } = req.body;
    // console.log({eventName , departmentName });
    eventSchema.findByIdAndUpdate(req.body._id,req.body)
    .then(result => {
        return res.status(200).json({ message: 'Event data updated successfully' });
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({message:err});
    })



    // try {
    //     const existingEvent = await eventSchema.findOne({departmentName:departmentName , eventName:eventName});
    //     if (existingEvent) {
    //         await eventSchema.updateOne( { _id: existingEvent._id } , req.body);
    //         return res.status(200).json({ message: 'Event data updated successfully' });
    //     } else {
    //         return res.status(404).json({ message: 'Event data not found' });
    //     }
    // } catch (error) {
    //     console.error('Error updating event data:', error);
    //     return res.status(500).json({message:'Internal server error'});
    // }
};





exports.addEvents = addEvents;
exports.editEvent = editEvent;
exports.deleteEvent = deleteEvent;
exports.getEventData = getEventData;
exports.getEventByName = getEventByName;
exports.editingEvent = editingEvent;
exports.getAllEvents = getAllEvents;