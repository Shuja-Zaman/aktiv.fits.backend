const express = require('express');
const router = express.Router();
const { verifyEmail, resendVerificationEmail, isVerified } = require('../controllers/VerifyController');

// Get verify route
router.get('/:token', verifyEmail);

// resend mail
router.post('/resend', resendVerificationEmail);

// Check if user is verified
router.post('/isverified', isVerified);

module.exports = router;
