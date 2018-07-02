const mongoose = require('mongoose');
const schema = mongoose.Schema;

var messageSchema = new schema({
    message: {
        type: String,
        required: true,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

var Message = mongoose.model('Message', messageSchema);
module.exports = {Message};