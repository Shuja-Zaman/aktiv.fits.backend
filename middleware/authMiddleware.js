const jwt = require('jsonwebtoken');
const User = require('../models/Customer');

const auth = async (req, res, next) => {
  // Retrieve token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // Check if the user is a customer
    if (req.user.role === 'customer') {
      const user = await User.findById(req.user.id);

      // Check if the user exists and is verified
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (!user.isVerified) {
        return res.status(403).json({ message: 'Email not verified. Access denied.' });
      }
    }

    next();
  } catch (err) {
    // Handle invalid token
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
