var mongoose = require('mongoose');
var schema = mongoose.Schema;

var productSchema = new schema({
    pId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    pImage: {
        type: String
    },
    price: {
        type: String
    },
    discount: {
        type: String,
        default: 0
    },
    likes: String,
    quantity: String,
    category: String,
    pColor: String,
    genderCat: String,
    modifiedAt:{
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

var Product = mongoose.model('Product', productSchema);

module.exports = {Product};