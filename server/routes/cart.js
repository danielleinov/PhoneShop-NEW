const Cart = require('../controllers/cart');
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .post(catchAsync(Cart.addCart))
router.route('/user/:userId')
    .get(catchAsync(Cart.getCartByUserId))
router.route('/:cartId/')
    .delete(catchAsync(Cart.deletePhoneFromCart))
module.exports = router;