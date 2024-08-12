const express = require('express');
const { placeOrder, getAllOrders, deleteOrder } = require('../controllers/OrderController');

const router = express.Router();

// Route to place an order
router.post('/placeOrder', placeOrder);

// Route to get all orders
router.get('/orders', getAllOrders);

// Route to delete an order by ID
router.delete('/orders/:id', deleteOrder);

module.exports = router;
