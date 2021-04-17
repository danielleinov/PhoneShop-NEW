const mongoose = require('mongoose');

schema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    cart: {
        type: Object
    },
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Order', schema);