const Order = require('../controllers/order');
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .post(catchAsync(Order.addOrder))
    .get(catchAsync(Order.getOrders))

module.exports = router;