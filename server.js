const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const router = require('./routes/routes')
const firstMid = require('./middlewares/firstMid')
const secondMid = require('./middlewares/secondMid')
const thirdMid = require('./middlewares/thirdMid')
const emailValidator = require('deep-email-validator')



const app = express()
app.use(cookieParser())
app.use(expressSession({
    secret: 'lmtechub',
    saveUninitialized: true,
    resave: false,
    cookie: {}
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const port = process.env.PORT || 3100

function handleTest(req, res){
    // req.cookie.destroy()
    req.session.destroy()
    res.send('logged out')
}

app.get('/', (req, res)=>{
    res.send('this is the home route')
})
app.use('/api',router)
app.get('/test', handleTest)



// Middleware - function, has access to (req, res, another func next)

///localhost:5000/api/users

// async function checkEmail() {
//     const validEmail = await emailValidator.validate('emmaokekeike@yahoo.com')
//     console.log(validEmail)
// }
// checkEmail()
    
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    mongoose.connect('mongodb://127.0.0.1:27017/LMpay_app')
    .then(()=>{
        console.log('MongoDB is connected');
    })
})


module.exports = app

//create a func. that does the same thing a .split method does...