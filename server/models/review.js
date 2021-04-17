const mongoose = require('mongoose');

schema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    author: {
        type: String,
        required: true
        //minlength: 2,
        //maxlength: 50
    },
    date: {
         type: String,
         required: true,
    }
});


module.exports = mongoose.model('Review', schema);