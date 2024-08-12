const express = require('express');
const auth = require('../middleware/authMiddleware')
const router = express.Router();
const { registerUser, loginUser, getUserById } = require('../controllers/UserController');

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get user by ID
router.get('/:id', getUserById);

module.exports = router;
