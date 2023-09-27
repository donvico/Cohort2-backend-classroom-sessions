const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    transaction_type:{
        type: String,
        required: true,
        enum: ['TRANSFER', 'WITHDRAWAL', 'DEPOSIT','BILL']
    },
    amount: {
        type: Number,
        required: true
    },
    sender_receiver: {
        type: mongoose.Schema.ObjectId
    },
    merchant_name: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
})

const transactionModel = mongoose.model('transact', transactionSchema)
module.exports.transactionModel = transactionModel