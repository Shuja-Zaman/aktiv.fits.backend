const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { adminLogin, adminRegister } = require('../controllers/AuthController');

// Admin login
router.post('/login',  adminLogin);

// Admin register
// router.post('/register', adminRegister);

module.exports = router;
