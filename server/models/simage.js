var mongoose = require('mongoose');

var SIMAGE = mongoose.model('SIMAGE', {
    name: String
});

module.exports = {SIMAGE};