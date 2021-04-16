const mongoose = require('mongoose');

schema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    cart: {
        type: Object
    }
});

module.exports = mongoose.model('Order', schema);