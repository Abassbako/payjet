const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please this field is required']
        },
        categories: {
            type: Array,
            required: [true, 'Please this field is required']
        },
        desc: {
            type: String,
            required: true
        },
        size: { type: String },

        color: { type: String },
        price: {
            type: Number,
            required: true,
            default: 1
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;