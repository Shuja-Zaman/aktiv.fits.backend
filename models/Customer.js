const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customer = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'customer',
        enum:['customer']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date
},{timestamps:true});



module.exports = mongoose.model('customer', customer);