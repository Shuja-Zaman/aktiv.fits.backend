// models/review.model.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'customer'
  },
  userName:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'customer',
    required:true,
    type:String
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'product'
  },
  comment: {
    type: String,
    required: true,
    trim: true
  }
},{timestamps:true});

module.exports = mongoose.model('Review', reviewSchema);
