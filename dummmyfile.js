// [{
//     "userRollNumber": "12323",
//     "userName": "eren",
//     "userMobile": 948938493,
//     "userCollege": "aec",
//     "userEmail": "aec@gmail.com",
//     "userGender": "male",
//     "userDepartment": "ece",
//     "userLocation": "surampalem",
//     "userYear": 2023,
//     "userEventCategory": "ece",
//     "userEvent": "eventtt",
//     "userTeamsize": 4,
//     "userAccomodation": "yes"
//   }]

  const { validationResult } = require('express-validator');
const Notification = require('../models/notifications');
const axios = require('axios')
const addNotifications = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { link,heading,type, Description, branch,pass_outyear,gender,batch, addedby, status } = req.body;
    
    const image = req.file ? req.file.filename : null;

    const notification = new Notification({
      image,
      link,
      type,
      heading,
      Description,
      branch,
      pass_outyear,
      gender,
      batch,
      addedby,
      status,
    });

    // console.log(placement);
    await notification.save();
    res.status(201).json({ message: 'Notification added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getNotificationDataStatus = async (req, res, next) => {
  let notification;
  try {
    notification = await Notification.find({});
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return res.status(500).json({ message: "Server Error." });
  }

  if (!notification || notification.length === 0) {
    return res.status(404).json({ message: "No data found." });
  }
  notification.map(ele=>ele.image = process.env.NOTIFICATIONS_IMAGE_URI+ele.image)
  return res.status(200).json(notification);
};



const getNotificationsById = async (req, res, next) => {
  const _id = req.params.id;

  try {
    const notification = await Notification.findById(_id);

    if (!notification) {
      return res.status(404).json({ message: "Placement not found" });
    }

    return res.status(200).json(notification);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



const deleteNotificationDataById = async (req, res, next) => {
  const _id = req.params.id;
  console.log(_id);
  let notification;
  try {
    notification = await Notification.findByIdAndDelete(_id);
  } catch (err) {
    return console.log(err);
  }
  if (!notification) {
    return res.status(400).json({ message: "No data is found." });
  }
  return res.status(200).json({ message: "success" });
};




const updatenotificationData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { link,heading, type, Description, branch, pass_outyear, gender, batch, addedby, status } = req.body;
    const image = req.file ? req.file.filename : null;

    // Creating an object with only the fields that need to be updated
    const updatedFields = {
      link,
      heading,
      type,
      Description,
      branch,
      pass_outyear,
      gender,
      batch,
      addedby,
      status,
    };

    if (image) {
      updatedFields.image = image;
    }

    const notification = await Notification.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification updated successfully', notification });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const testing = async (req, res, next) => {
  const batch = req.body.batch;

  try {
    // Using map and Promise.all to handle asynchronous calls properly
    const notificationPromises = batch.map(async (ele) => {
      const notify_data = {
        "notification": {
          "title": "Testing notification",
          "body": "This is testing notification"
        },
        "data": {
          "IMG": "https://maya.technicalhub.io/assets/images/Drive-Ready.png"
        },
        "to": `/topics/${ele.roll_no}`
      };

      const bearerToken = 'firebase-token'; // Replace with your actual token
  
    const apiUrl = 'https://fcm.googleapis.com/fcm/send';

      try {
        const response = await axios.post(apiUrl, notify_data, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
          }
        });

        // Log the notify_data and response
        console.log('Notify Data:', notify_data);
        console.log('API Response:', response.data);

        // Check for FCM errors in the response
        if (response.data.failure > 0 || response.data.error) {
          console.error('FCM Error:', response.data.results[0].error);
        }
      } catch (apiError) {
        console.error('Error calling API:', apiError.message);
      }
    });

    // Wait for all notifications to be sent
    await Promise.all(notificationPromises);

    // Send a success response after all notifications are processed
    res.status(200).json({ message: 'Notifications sent successfully!' });
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};
exports.addNotifications = addNotifications;
exports.getNotificationDataStatus = getNotificationDataStatus;
exports.getNotificationsById=getNotificationsById;
exports.deleteNotificationDataById = deleteNotificationDataById;
exports.updatenotificationData = updatenotificationData;
exports.testing = testing;



// ROUTERRR

const express = require('express');
const router = express.Router();
const AddNotificationController = require('../controllers/NotificationController.js');
const { check } = require('express-validator');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/notification'); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  }
});

const upload = multer({ storage: storage });

router.post('/api/add-notificationdata', upload.single('image'), AddNotificationController.addNotifications);
router.get('/api/get-notificationsdata', AddNotificationController.getNotificationDataStatus);
router.get('/api/getnotificationdata-id/:id',AddNotificationController.getNotificationsById);
router.delete('/api/delete-Notification-data/:id', AddNotificationController.deleteNotificationDataById);
router.put('/api/edit-Notification_data/:id',upload.single('image'), AddNotificationController.updatenotificationData);
// router.get('/api/getdata-id/:id',AddplacementsController.getPlacementById);
// router.get('/api/get-placements-status', AddplacementsController.getPlacementDataStatus);
router.post('/api/testing', AddNotificationController.testing);


module.exports = router;



// FRONT END

import React, { useState, useEffect } from "react";
import { Row, Card, CardBody, Button, Label, Col, FormGroup, Input, Form } from "reactstrap";
import Select from "react-select";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

const AddUser = () => {
  const navigate = useNavigate();
  document.title = "Technical Hub | Add User";

  const [data, setData] = useState({
    Description: '',
    heading: '',
    register_link: '',
  });
  const [typeSelectedGroup, setTypeSelectedGroup] = useState([]);
  const [batchSelectedGroup, setBatchSelectedGroup] = useState([]);
  const [branchSelectedGroup, setBranchSelectedGroup] = useState([]);
  const [yearSelectedGroup, setYearSelectedGroup] = useState([]);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [addedby, setAddedBy] = useState("");
  const [status, setStatus] = useState(true); // true for Active, false for Inactive
  const [gender, setGender] = useState("");

  useEffect(() => {
    const curr_user = JSON.parse(localStorage.getItem('authUser'));
    if (curr_user) {
      setAddedBy(curr_user.roll_no);
    }
  }, []);

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 9 }, (_, index) => ({
      label: (currentYear + index).toString(),
      value: (currentYear + index).toString(),
    }));
  };

  const yearOptionGroup = getYearOptions();

  const typeOptionGroup = [
    { label: "Batch", value: "Batch" },
    { label: "Branch", value: "Branch" },
    { label: "Passout Year", value: "Passout Year" },
    { label: "Gender", value: "Gender" },
  ];

  const batchOptionGroup = [
    { label: "Batch 1", value: "Batch 1" },
    { label: "Batch 2", value: "Batch 2" },
    { label: "Batch 3", value: "Batch 3" },
  ];

  const branchOptionGroup = [
    { label: "EEE", value: "EEE" },
    { label: "ECE", value: "ECE" },
    { label: "CSE", value: "CSE" },
  ];

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleTypeSelectGroup = (selectedOptions) => {
    setTypeSelectedGroup(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleTypeBatchGroup = (selectedOptions) => {
    setBatchSelectedGroup(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleTypeBranchGroup = (selectedOptions) => {
    setBranchSelectedGroup(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleYearSelectGroup = (selectedOptions) => {
    setYearSelectedGroup(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleGenderChange = (selectedOption) => {
    setGender(selectedOption ? selectedOption.value : "");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const addUser = async () => {
    const formData = new FormData();
  
    // Append each branch separately to ensure it's treated as an array in the backend
    branchSelectedGroup.forEach(branch => {
      formData.append('branch[]', branch);
    });
  
    yearSelectedGroup.forEach(pass_outyear => {
      formData.append('pass_outyear[]', pass_outyear);
    });

    batchSelectedGroup.forEach(batch => {
      formData.append('batch[]', batch);
    });


    formData.append('image', file);
    formData.append('type', typeSelectedGroup.join(','));
    // formData.append('batch', batchSelectedGroup.join(','));
    // formData.append('pass_outyear', yearSelectedGroup.join(',')); // Ensure this is correctly added
    formData.append('link', data.register_link);
    formData.append('Description', data.Description);
    formData.append('heading', data.heading);
    formData.append('addedby', addedby);
    formData.append('createdAt', new Date().toISOString());
    formData.append('status', status ? 1 : 0); // Convert boolean to 1 (Active) or 0 (Inactive)
    formData.append('gender', gender); // Ensure gender is correctly added
  
    try {
      const response = await axios.post('', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 201) {
        toast.success('Notifications added successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate('/notificationslist'); // Update to string path
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = 'Please fill in all required fields correctly.';
            break;
          case 500:
            errorMessage = 'Something went wrong';
            break;
          default:
            errorMessage = 'An unexpected error occurred';
        }
      }
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error('Error adding Notifications:', error);
    }
  };
  

  return (
    <React.Fragment>
      <Row>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Col xl="6">
          <Card>
            <CardBody>
              <h4 className="card-title">ADD Notifications Data</h4>
              <Form className="needs-validation">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="image">Image</Label><br />
                      {previewUrl && <img src={previewUrl} alt="Preview" width="50px" />}
                      <Input type="file" id="image" className="form-control" onChange={handleFileChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="type">Type</Label>
                      <Select
                        isMulti
                        onChange={handleTypeSelectGroup}
                        options={typeOptionGroup}
                        classNamePrefix="select2-selection"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {typeSelectedGroup.includes('Branch') && (
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="branch">Branch</Label>
                        <Select
                          isMulti
                          onChange={handleTypeBranchGroup}
                          options={branchOptionGroup}
                          classNamePrefix="select2-selection"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                {typeSelectedGroup.includes('Batch') && (
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="batch">Batch</Label>
                        <Select
                          isMulti
                          onChange={handleTypeBatchGroup}
                          options={batchOptionGroup}
                          classNamePrefix="select2-selection"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                {typeSelectedGroup.includes('Passout Year') && (
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="passout-year">Passout Year</Label>
                        <Select
                          isMulti
                          onChange={handleYearSelectGroup}
                          options={yearOptionGroup}
                          classNamePrefix="select2-selection"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                {typeSelectedGroup.includes('Gender') && (
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="gender">Gender</Label>
                        <Select
                          options={genderOptions}
                          value={genderOptions.find(option => option.value === gender)}
                          onChange={handleGenderChange}
                          classNamePrefix="select2-selection"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="heading">Heading</Label>
                      <Input
                        type="text"
                        id="heading"
                        name="heading"
                        value={data.heading}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="register_link">Register Link</Label>
                      <Input
                        type="text"
                        id="register_link"
                        name="register_link"
                        value={data.register_link}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="Description">Description</Label>
                      <Input
                        type="textarea"
                        id="Description"
                        name="Description"
                        value={data.Description}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="status">Status</Label>
                      <Switch
                        checked={status}
                        onChange={() => setStatus(!status)}
                        offColor="#888"
                        onColor="#0d6efd"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="primary" onClick={addUser}>Add Notifications</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddUser;



