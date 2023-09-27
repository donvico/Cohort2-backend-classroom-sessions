const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    pin: {
        type: Number,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    account_number: {
        type: Number,
        unique: true,
        default: 0
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    bvn: {
        type: Number,
        unique: true,
        default: 0
    },
    secret_question:{
    type: String
    },
    secret_answer:{
        type: String
    },
    balance:{
        type: String
    }
})

userSchema.methods.setAccountNumber = function(){
    const user = this
    user.account_number = user.phone_number
}

userSchema.methods.myComparePassword = async function(password){
    const user = this
    return await bcrypt.compare(password, user.password)
}

userSchema.methods.generateToken = function(user){
return jwt.sign({_id: user._id, email: user.email}, process.env.SECRET, {expiresIn: '1h'})
}
// userSchema.methods.hashMyPassword = async function(){
//         const user = this
//         const bcryptSalt = await bcrypt.genSalt(10)
//         const hashPassword = await bcrypt.hash(user.password, bcryptSalt)
//         user.password = hashPassword
// }


userSchema.pre('save' ,async function(){
    const user = this
    user.phone_number = '0' + user.phone_number
    const bcryptSalt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, bcryptSalt)
    user.password = hashPassword
})

const UserModel = mongoose.model('user', userSchema)
module.exports.UserModel = UserModel