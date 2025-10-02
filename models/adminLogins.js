
const mongoose = require("mongoose");

const adminLogins = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
    },
    userPassword : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model("adminLogins" , adminLogins);