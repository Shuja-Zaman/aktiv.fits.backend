const mongoose = require('mongoose');

const category = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Category name is requiredx'],
        trim:true,
        minlength: [3, 'Category name must be at least 3 characters long'],
        maxlength: [50, 'Category name cannot exceed 50 characters']
    }
},{timestamps:true});


module.exports = mongoose.model('category',category);