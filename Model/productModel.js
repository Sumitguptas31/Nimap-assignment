const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        require:true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    product_price: {
        type: Number,
        require:true
    },
    description:{
        type: String,
        require:true
    },
    verified:{
      type:Boolean,
      require:true
    }
},{timestamps:true});

module.exports = mongoose.model('allproducts', productSchema)