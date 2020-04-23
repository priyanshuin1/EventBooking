const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var bookingTicketSchema = new mongoose.Schema({
    eventId : {
        type :  mongoose.Schema.Types.ObjectId, ref: 'event'
    },
    userName :{
        type : String
    },
    emailId : {
        type : String
    },
    phoneNo : {
        type : Number
    },
    noOfSeats : {
        type : Number
    },
    nameOfAttendees : {
        type : Array
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



module.exports=mongoose.model('bookingTicket', bookingTicketSchema);