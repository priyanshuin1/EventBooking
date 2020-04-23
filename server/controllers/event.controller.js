const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const eventModel=require('./../models/event.model');
const bookingTicketModel=require('./../models/BookingTicket.model');
/**
 * Add Event Function
 * Methode Post, Pass data in body
 * DLS
 */
module.exports.addEvent=(req,res)=>{
    console.log(req.body,'sfskdjfhkds');
    let eventData= req.body;
    var newEventModel= new eventModel({
        eventName : eventData.eventName,
        imageName : eventData.imageName,
        dateOfEvent : eventData.dateOfEvent,
        totalSeats : eventData.totalSeats,
        seatsAvailabel : eventData.seatsAvailabel,
    })
    newEventModel.save((err,saveEvent)=>{
        if(saveEvent){
            eventModel
            var outputJSON = {
                status: 200,
                msg: 'Event Saved Successfully!!',
                saveData: saveEvent
            }
            res.status(200).send(outputJSON)
      
        }else{
            var outputJSON = {
                status: 201,
                msg: 'error',
                data: err
            }
            res.status(201).send(outputJSON)
      
        }
    })
}
/**
 * Get All event
 * Methode get, status=false
 * DLS
 */

 module.exports.getAllEvent=(req,res)=>{
     console.log('req.params=', req.body);
     let searchData= req.body.searchData;
     var brandCond = { $or: [{ "eventName": new RegExp("^" + searchData, 'i') }] };
         brandCond['status'] = false;
    eventModel.find(brandCond)
    .sort({_id : -1})
    .exec((err,eventData)=>{
        if(eventData){
            var outputJSON = {
                status: 200,
                msg: 'Event Data found Suucessfully!!',
                saveData: eventData
            }
            res.status(200).send(outputJSON)

        }else{
            var outputJSON = {
                status: 201,
                msg: 'Event Data Not found!!',
                saveData: err
            }
            res.status(201).send(outputJSON)

        }
    })
 }
 /**
  * Book Event Ticket 
  * Methode Post, pass data in body
  * DLS
  */
 module.exports.bookTicket=(req, res)=>{
    console.log(req.body,'653876583746587');
    let eventData= req.body.bookingData;
    var newbookingTicketModel= new bookingTicketModel({
        eventId : req.body.eventId,
        userName : eventData.fullName,
        emailId : eventData.emailId,
        phoneNo : eventData.phoneNo,
        noOfSeats : eventData.NoOfSeats,
        nameOfAttendees : eventData.NameOfAttended,
    })
    eventModel.find({_id : req.body.eventId})
    .exec((err,seatsCount)=>{
        if(seatsCount[0].seatsAvailabel<eventData.NoOfSeats){
            let avalabelseats= seatsCount[0].seatsAvailabel;
            console.log('avalabelseats=', avalabelseats);
            var outputJSON = {
                status: 202,
                msg: 'Selected seat count is not avalabel, Please select seat Less then this count or equal to '  + avalabelseats  ,
                saveData: seatsCount
            }
            res.status(202).send(outputJSON)
        }else{
            newbookingTicketModel.save((err,BookingTicket)=>{
                if(BookingTicket){
                    eventModel.find({_id:req.body.eventId})
                    .exec((err,resp)=>{
                        let avalSets= resp[0].seatsAvailabel - eventData.NoOfSeats;
                        if(resp){
                            eventModel.update({_id : req.body.eventId},
                                {
                                    $set : {
                                        seatsAvailabel: avalSets,
                                        updatedAt: Date.now()
                                    }
                                })
                                .exec((err,updatedData)=>{
                                    if(updatedData){
                                        var outputJSON = {
                                            status: 200,
                                            msg: 'Ticket Booked!!',
                                            saveData: BookingTicket
                                        }
                                        res.status(200).send(outputJSON)
                                    }else{
                                        var outputJSON = {
                                            status: 201,
                                            msg: 'error!',
                                            saveData: err
                                        }
                                        res.status(201).send(outputJSON) 
                                    }
                                })
                        }
                    })
              
                }else{
                    var outputJSON = {
                        status: 201,
                        msg: 'error',
                        data: err
                    }
                    res.status(201).send(outputJSON)
              
                }
            })
        }
    })
    
 }