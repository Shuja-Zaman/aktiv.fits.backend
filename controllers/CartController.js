
exports.addToCart = (req, res) => {
    try {
        const { productId, quantity, size, name, price } = req.body;
        const cart = req.session.cart || [];

        const existingItem = cart.find(item => item.productId === productId && item.size === size);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ productId, quantity, size, name, price });
        }

        req.session.cart = cart;

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




exports.getCart = (req, res) => {
    try {
        const cart = req.session.cart || [];

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.removeFromCart = (req, res) => {
    try {
        const { productId, size } = req.params;

        // Check if parameters are provided
        if (!productId || !size) {
            return res.status(400).json({ message: 'Invalid parameters' });
        }

        let cart = req.session.cart || [];
        const itemIndex = cart.findIndex(item => item.productId === productId && item.size === size);

        if (itemIndex > -1) {
            const removedItem = cart.splice(itemIndex, 1)[0];
            req.session.cart = cart;
            res.status(200).json({ message: 'Item removed from cart', removedItem });
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
