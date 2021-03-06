const Cart = require('../models/cart');
const Phone = require('../models/phone')

module.exports.addCart = async (req, res) => {
    const { userId, phoneId, quantity} = req.body;
    let cart = await Cart.findOne({ userId });
    let phone = await Phone.findById(phoneId);
    if (cart) {

        //cart exists for user
        let itemIndex = cart.phones.findIndex(p => p.phone._id == phoneId);

        cart.totalQuantity += quantity;
        if (itemIndex > -1) {

            //product exists in the cart, update the quantity
            let productItem = cart.phones[itemIndex];
            productItem.quantity += quantity;
            productItem.totalPricePhone = phone.price * productItem.quantity;
            cart.phones[itemIndex] = productItem;
        } else {
            //product does not exists in cart, add new item
            cart.phones.push({ phone: phoneId, quantity: quantity, totalPricePhone: phone.price * quantity});
        }
        cart = await Cart.saveAndPopulate(cart);
        return res.json(cart);
    } else {
        //no cart for user, create new cart
        const newCart = new Cart({
            userId,
            phones: [{phone: phoneId, quantity: quantity, totalPricePhone: phone.price * quantity }],
            totalQuantity: quantity
        });

        cart = await Cart.saveAndPopulate(newCart);

        return res.json(cart);
    }
}

module.exports.getCartByUserId = async (req, res) => {
    const {userId} = req.params;
    let cart = await Cart.findOne({ userId }).populate('phones.phone');
    if (!cart) {
        return res.status(404).send('That cart Not found');
    }
    return res.json(cart);
}

module.exports.deletePhoneFromCart = async (req, res) => {
    const {cartId} = req.params;
    const {phoneId, quantity} = req.body;
    let oldCart = await Cart.findById(cartId);
    let phone = await Phone.findById(phoneId);
    let itemIndex = oldCart.phones.findIndex(p => p.phone._id == phoneId);
    let productItem = oldCart.phones[itemIndex];
    productItem.quantity -= quantity;
    productItem.totalPricePhone = phone.price * productItem.quantity;
    oldCart.phones[itemIndex] = productItem;
    if (productItem.quantity == 0) {
        oldCart.phones.splice(itemIndex, itemIndex + 1);
    }
    oldCart.totalQuantity -= 1;
    const cart = await Cart.saveAndPopulate(oldCart);
    return res.json(cart);
}