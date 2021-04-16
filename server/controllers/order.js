const Order = require('../models/order');
const Cart = require('../models/cart')

module.exports.addOrder = async (req, res) => {
    const {totalPrice, cart} = req.body;
    console.log(totalPrice)
    console.log(cart)
    await Cart.findByIdAndDelete(cart._id);
    const order = new Order({totalPrice: totalPrice, cart: cart});
    await order.save();
    res.send(order);

}

module.exports.getOrders = async (req, res) => {
    const orders = await Order.find();
    res.send(orders)
}
