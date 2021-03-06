const Review = require('../controllers/review');
const express = require('express');
const router = express.Router();
const { validateRequest } = require('../middlewares/SchemaValidator');
const catchAsync = require('../utils/catchAsync');
const {schemaReview} = require('../schemas');

router.route('/')
    .post(validateRequest(schemaReview), catchAsync(Review.addReview))
    .get(catchAsync(Review.getReviews))

router.route('/:id')
    .get(catchAsync(Review.getReviewById))
    .patch(catchAsync(Review.updateReviewById))
    .delete(catchAsync(Review.deleteReviewById))

module.exports = router;