const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlEvent= require('./../controllers/event.controller')
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
// router.get('/userProfile', ctrlUser.userProfile);


router.post('/product/fileUpload', ctrlUser.saveImageDocument);
router.post('/imageupload',ctrlUser.saveImagedata);

//Event Route
router.post('/eventAdd', ctrlEvent.addEvent);
router.post('/getAllEvent', ctrlEvent.getAllEvent);
router.post('/bookEventTicket',ctrlEvent.bookTicket);


module.exports = router;



