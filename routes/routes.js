const express = require('express'); 
const { createUser, getUsers } = require('../controllers/userController.js');
const router = express.Router()
const userRoute = require('./userRoute')

router.use('/users',userRoute)


module.exports = router