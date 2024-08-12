const crypto = require('crypto');

// Generate a verification token
exports.generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
  };