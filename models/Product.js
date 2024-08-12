const mongoose = require('mongoose');

const product = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
  },
  imgurl: {
    type: String,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: [true, 'Category ID is required']
  },
  sizes: {
    type: [String], // Array of size options
    enum: ['large','medium'], // Define the possible size values
    default: [], // Default to an empty array if no sizes are provided
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('product', product);
