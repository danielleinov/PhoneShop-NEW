const Cart = require('../controllers/cart');
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .post(catchAsync(Cart.addCart))

module.exports = router;