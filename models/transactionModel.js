const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    category: {
        type: String,
        requires: [true, 'Category is required'],
    },
    refernce: {
        type: String,
    },
    description: {
        type: String,
        requires: [true, 'Description is required'],
    },
    date: {
        type: String,
        requires: [true, 'Date is required'],
    },

}, { timestamps: true })

const transactionModel = mongoose.model('transactions', transactionSchema);