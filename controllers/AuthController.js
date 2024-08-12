const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new admin
exports.adminRegister = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
  
      admin = new Admin({
        name,
        email,
        password,
        role: 'admin'
      });
  
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
  
      await admin.save();
  
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Admin login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: admin.id,
        role: admin.role
      }
    };



    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite:'strict'});


    // Send user details and token in response
    res.status(200).json({
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email
      }
    });


    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
