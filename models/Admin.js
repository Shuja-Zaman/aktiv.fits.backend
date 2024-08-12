const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const admin = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[4,'Password should be minimum 4 characters']
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
        minlength:[8,'Password should be minimum 8 characters']
    },
    role:{
        type:String,
        default:'admin',
        enum:['admin']
    }
},{timestamps:true});


module.exports = mongoose.model('admin',admin);