const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        UserId: {
            type: String,
            required: true
        },
        products: [
            {
                productId: { 
                    type: String
                 },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
    }
);

const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;