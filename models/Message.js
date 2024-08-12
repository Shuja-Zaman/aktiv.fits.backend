const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const message = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[4,'Name should be minimum 4 characters']
    },
    email:{
        type:String,
        required:true,
        match:[/.+\@.+\..+/, 'Please fill a valid email address']
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true});



module.exports = mongoose.model('message', message);