const Cart = require('../models/cart');

module.exports.addCart = async (req, res) => {
    const { userId, phoneId, quantity} = req.body;
    let cart = await Cart.findOne({ userId });

    if (cart) {

        //cart exists for user
        let itemIndex = cart.phones.findIndex(p => p.id == phoneId);
        console.log(itemIndex)
        cart.totalQuantity += quantity;
        if (itemIndex > -1) {

            //product exists in the cart, update the quantity
            let productItem = cart.phones[itemIndex];
            console.log(productItem)
            productItem.quantity += quantity;
            cart.phones[itemIndex] = productItem;
        } else {
            //product does not exists in cart, add new item
            cart.phones.push({ id: phoneId, quantity: quantity});
        }
        cart = await Cart.saveAndPopulate(cart);
        return res.json(cart);
    } else {
        //no cart for user, create new cart
        const newCart = new Cart({
            userId,
            phones: [{id: phoneId, quantity: quantity}],
            totalQuantity: quantity
        });

        cart = await Cart.saveAndPopulate(newCart);

        return res.json(cart);
    }
}

