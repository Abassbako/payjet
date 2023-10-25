const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: [ 8, 'username must be more than seven(7) characters' ],
            maxlength: [ 30, 'username cannot be more than thirty(30) characters' ],
            unique: true
        },
        email: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 200,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: [ 8, 'password must be ten(10) or more than' ],
            maxlength: 2048
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    }, {
        timestamps: true
    },
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;