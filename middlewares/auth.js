const { ADMIN } = require('../constants')
const { UserModel } = require('../models/userModel')

const jwt = require('jsonwebtoken')

async function auth(req, res, next){
    try {
        const token = req.headers.token
        if(!token){
            return res.status(400).json({success: false, message: 'Please provide token'})
        }

        const {_id} = jwt.verify(token, process.env.SECRET)
        const user = await UserModel.findById(_id, '-password -bvn -pin')
        req.user = user
        user.role = ADMIN.toLowerCase()
        next()
    } catch (error) {
        res.status(500).json({success: false, error: error})
    }
}

module.exports = auth