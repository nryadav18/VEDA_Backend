const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
const userRouter = require('./routers/userRouter');
const eventRouters = require('./routers/eventRouters');
const depaetmentRouter = require('./routers/departmentRouter');
const adminLoginRouter = require('./routers/adminLoginRouter');
const facultyCod = require('./routers/facultyCordRouters');
const studentCod = require('./routers/studentCordRouters');
const paymentRouters = require("./routers/paymentRouters");
const dashboardRouters = require("./routers/dashboardRouter");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const PORT = 2001;

const urlSting = "mongodbString"; // Replace with your actual MongoDB connection string

mongoose.connect(urlSting, {
    useNewUrlParser: true,   
    useUnifiedTopology: true, 
});
const db = mongoose.connection;
db.once("open",function(){
    console.log("connected successfully")
})

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', userRouter);
app.use('/', eventRouters);
app.use('/', adminLoginRouter);
app.use('/',studentCod);
app.use('/',facultyCod);
app.use('/',depaetmentRouter);
app.use("/",paymentRouters);
app.use('/',dashboardRouters);

// Admin dashboard


app.get('/', (req, res) => {
    res.send('data getting succefully its true');
})

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
  });


