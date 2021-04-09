const Review = require('../models/review');
const Phone = require('../models/phone');

module.exports.addReview = async (req, res) => {
    const { phoneId, content, author } = req.body;
    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    console.log(date)
    const review = new Review({ content, author, date });
    await review.save();
    Phone.findOne({ _id: phoneId }).then(function(phone) {
        // If we were able to successfully update a Product, send it back to the client
        phone.reviews.push(review);
        phone.save();
        res.json(phone);
    })
}

module.exports.getReviews = async (req, res) => {
    const reviews = await Review.find();
    res.send(reviews)
}

module.exports.getReviewsByPhoneId = async (req, res) => {
    const reviews = await Phone.findById(req.params.id).populate("reviews")
    res.send(reviews)
}