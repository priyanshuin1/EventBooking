const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var EventSchema = new mongoose.Schema({

    eventName :{
        type : String
    },
    imageName : {
        type : String
    },
    dateOfEvent : {
        type : Date
    },
    totalSeats : {
        type : Number
    },
    seatsAvailabel : {
        type : Number
    },
    status : {
        type : Boolean,
        default : false
    },
    createdAt :{
        type : Date,
         default : Date.now
    },
    updatedAt :{
        type : Date,
         default : Date.now
    }

});



module.exports=mongoose.model('event', EventSchema);