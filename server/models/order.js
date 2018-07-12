const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new Schema({
    orderDetailsId: {
        type: objectId,
        required: true
    },
    userId: {
        type: objectId,
        required: true
    },
    orderAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    modifiedAt: {
        type: Date,
        default: new Date()
    }
});

var Order = mongoose.model('Order', orderSchema);
module.exports = {Order};