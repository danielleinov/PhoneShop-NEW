const mongoose = require('mongoose');

schema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        //minlength: 2,
        //maxlength: 50
    },
    discount: {
        type: Number,
        required: true,
        // minlength: 5,
        // maxlength: 255,
    },
    description: {
        type: String,
        required: true,
        minlength: 5
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

module.exports = mongoose.model('Phone', schema);