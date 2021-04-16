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
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    manufacturer: {
        type: String,
        required: true,
        minlength: 2
    },
    imageUrl: {
        type: String,
        required: false,
        minlength: 6
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

module.exports = mongoose.model('Phone', schema);