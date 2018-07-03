var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: () =>{
                
            }
        }
    },
    password: {
        type: String
    }
});

module.exports = {User};