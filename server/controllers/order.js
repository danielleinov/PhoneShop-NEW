const Order = require('../models/order');
const Cart = require('../models/cart');
const User = require('../models/user');

module.exports.addOrder = async (req, res) => {
    const {totalPrice, cart, userId} = req.body;
    await Cart.findByIdAndDelete(cart._id);
    const order = new Order({totalPrice: totalPrice, cart: cart, user: userId});
    await order.save();
    res.send(order);

}

module.exports.getOrders = async (req, res) => {
    const orders = await Order.find();
    res.send(orders)
}

module.exports.getUserOrders = async (req, res) => {
    const num = parseInt(req.query.num);
    Order.aggregate([{$group: {_id: "$user", "count": { "$sum": 1 }}}, { "$match": { "count": { "$gte": num } }},
        { $lookup: {from: 'users', localField: '_id', foreignField: '_id', as: 'user'} }]).then((order) => {
        res.json(order)
    })
}