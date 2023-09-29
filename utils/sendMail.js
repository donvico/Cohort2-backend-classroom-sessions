const nodemailer = require('nodemailer')
const dotenv = require("promise-dotenv").config()

const transporter = nodemailer.createTransport({
    auth: {
        user: 'cijeoma559@gmail.com',
        pass: process.env.NODEMAILER
    },
    service: 'gmail'
})

const option = {
    to: 'ano',
    from: 'anone',
    subect: 'anytin',
    html: 'everythin'
}

function mailSend(option, res){
   try {
       if(!option){
        return res.status(400).json({success: false, message: 'Please provide options'})
       }
       transporter.sendMail(option,(err, info)=>{
           if(err) return console.log('error dey', err.message);
           console.log(info);
       })
   } catch (error) {
    console.log('that error', error.message);
   }
}
console.log('send mail file was invoked');
module.exports.myGuy = 'my guy'
module.exports = mailSend


// mySend()