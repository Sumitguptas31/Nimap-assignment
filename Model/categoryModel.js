const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: { 
        type: String, 
        require:true
    },
    categoryDetails:{
        type:String,
        require:true
    },

},{timestamps:true});

module.exports = mongoose.model('Category', categorySchema)