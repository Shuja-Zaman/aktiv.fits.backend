const Order = require('../models/Order');
const OrderPlaceEmail = require('../config/orderPlaced');
const CustomerOrderConfirmation = require('../config/customerOrderCofirmation');

exports.placeOrder = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { orderItems, firstName, lastName, email } = req.body;

    // Ensure orderItems array exists
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No items in the order' });
    }

    // Save the order
    const order = new Order(req.body);
    await order.save();
    console.log('Order saved successfully:', order);

    // Prepare order details for the email
    const orderDetails = orderItems.map(item =>
      `Product: ${item.productName}\nQuantity: ${item.quantity}\nAmount: ${item.amount}\n`
    ).join('\n');

    const user = {
      name: firstName + ' ' + lastName,
      email: email
    };

    // Send order confirmation emails
    await OrderPlaceEmail(user, orderDetails);
    console.log('OrderPlaceEmail sent successfully');
    
    await CustomerOrderConfirmation(user, order);
    console.log('CustomerOrderConfirmation sent successfully');

    // Clear the cart from session
      req.session.cart = [];    

    res.status(201).json({ message: 'Order placed successfully', order: order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order', error });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Error fetching orders', error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ success: false, message: 'Error deleting order', error });
  }
};
