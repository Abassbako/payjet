const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true
    },
    products: [{
        prodctId: {
            type: String
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    amount: {
        type: String,
        required: true,
        default: '$0'
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('order', orderSchema);