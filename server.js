const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const router = require('./routes/routes')
const firstMid = require('./middlewares/firstMid')
const secondMid = require('./middlewares/secondMid')
const thirdMid = require('./middlewares/thirdMid')



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

app.use('/api',router)
app.get('/test', handleTest)

// Middleware - function, has access to (req, res, another func next)

///localhost:5000/api/users
    
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    mongoose.connect('mongodb://127.0.0.1:27017/LMpay_app')
    .then(()=>{
        console.log('MongoDB is connected');
    })
})

//create a function that displays the english alphabet in streamable response. make the streamable out put to be console.log