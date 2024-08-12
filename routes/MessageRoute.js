const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, removeMessage } = require('../controllers/MessageController');

// Route to handle contact form submissions
router.post('/contact', sendMessage);

// Route to get all contact messages (admin use)
router.get('/messages', getMessages);

// Route to remove contact messages (admin use)
router.post('/messages/remove', removeMessage);

module.exports = router;
