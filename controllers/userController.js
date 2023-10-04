const jwt = require('jsonwebtoken')
const { UserModel } = require("../models/userModel")
const mailSend = require('../utils/sendMail')

const htmlValue = `
<body style="background-color: red; font-size: 50px;">
  <h1> Baba don register congrats</h1>
  </body>
  `
  
  async function createUser (req,res){
      
      
      const {email, password, pin, phone_number, first_name, last_name} = req.body
      console.log(req.body)
      if(!email || !password || !pin || !phone_number || !first_name || !last_name){
          response = {success: false, data: 'Please provide all required fields'}
          res.redirect('/api/users/register', response)
          // return res.status(400).json({success: false, data: 'Please provide all required fields'})
        }
        if(isNaN(pin)){
            return res.status(400).json({message: 'Pin must be a number'})
        }
        const user = await UserModel.findOne({email})
        if(user){
            return res.status(401).json('Email exists')
        }
        
        const newUser =  new UserModel({email,password, pin: parseInt(pin), phone_number, first_name, last_name})
        newUser.setAccountNumber()
        await newUser.save()
    //     const emailOption = {
    //         to: email,
    //         from: 'promise',
    //         subject: 'Registration successful',
    //         html: htmlValue
    //     }
    //     mailSend(emailOption, res)
    //     res.status(201).json({success: true, data: 'User registered'})
    // }
    
    }
    

async function loginUser(req, res){
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({success: false, message: 'Please provide required fields'})
        }

        const user = await UserModel.findOne({email: email})

        if(!user){
            return res.status(404).json({success:false, message: 'User is not found'})
        }

        const passwordMatch = await user.myComparePassword(password)
        if(!passwordMatch){
            return res.status(400).json({success: true, message: 'Credential incorrect'})
        }
        // const token = user.generateToken(user)
        // console.log(token);
        // const myFirstData = jwt.verify(token, process.env.SECRET)
        // console.log(myFirstData,'the first');
        req.session.user = user
        res.status(200).json({success:true, data: 'Logged in successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
    }
}

async function getUsers(req,res){
    const users = await UserModel.find();
    res.status(200).json()

}

async function getUser(req, res){
    try {
      const user = req.session.user
      return res.status(200).json({success: true, data: user})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: error})
    }
}

function getRegisterPage(req, res){
    res.render('register', {title: 'this is the title'})
}

module.exports = {
    createUser,
    getUsers,
    loginUser,
    getUser,
    getRegisterPage
}
