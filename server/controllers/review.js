const Review = require('../models/review');
const Phone = require('../models/phone');

module.exports.addReview = async (req, res, next) => {
    const {phoneId, content, author} = req.body;
    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    console.log(date)
    const review = new Review({content, author, date});
    await review.save();
    Phone.findOne({_id: phoneId}).then(function (phone) {

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

module.exports.getReviewById = async (req, res) => {
    const {id} = req.params;
    Review.findById(id, function (err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send(doc);
    });
}

module.exports.updateReviewById = async (req, res) => {
    const {id} = req.params;
    Review.findOneAndUpdate({_id: id}, req.body, {upsert: true}, function (err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send(doc);
    });
}

module.exports.deleteReviewById = async (req, res) => {
    const {id} = req.params;
    Review.findByIdAndDelete(id, (err, doc) => {
        if (err) res.send(err)
        res.json({
            "status": "ok",
            "Deleted": doc
        });
    });
}