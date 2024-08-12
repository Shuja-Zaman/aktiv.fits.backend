const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const {getCart, addToCart, removeFromCart} = require('../controllers/CartController');

// get Cart
router.get('/', getCart);

// add to Cart
router.post('/add', addToCart);

// remove from Cart
router.delete('/remove/:productId/:size', removeFromCart);

module.exports = router;
