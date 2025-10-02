// const express = require('express');
// const Router = express.Router();

// const eventControllers = require('../controllers/eventControllers');


// Router.get('/api/get-event/:department', eventControllers.getEventData);
// Router.post('/add-event', eventControllers.addEvents);
// Router.put('/edit-event', eventControllers.editEvent);
// Router.delete('/delete-event', eventControllers.deleteEvent);
// Router.get('/api/get-event-by-name/:department/:eventname', eventControllers.getEventByName);

// Router.get('/api/get-all-events', eventControllers.getAllEvents);

// module.exports = Router;

const express = require('express');
const Router = express.Router();

const eventControllers = require('../controllers/eventControllers');


Router.get('/get-event/:department', eventControllers.getEventData);
Router.post('/add-event', eventControllers.addEvents);
Router.put('/edit-event', eventControllers.editEvent);
Router.post('/delete-event', eventControllers.deleteEvent);
Router.get('/get-event-by-name/:department/:eventname', eventControllers.getEventByName);

Router.get('/api/get-all-events', eventControllers.getAllEvents);
Router.put('/api/editing-event-by', eventControllers.editingEvent);

module.exports = Router;