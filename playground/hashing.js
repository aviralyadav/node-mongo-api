const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
}

var token = jwt.sign(data, 'abc12345');
console.log(token);
var decoded = jwt.verify(token, 'abc12345');

console.log('decoded', decoded);
// var msg = 'I am Aviral!.';

// var hash = SHA256(msg).toString();

// console.log(`Message: ${msg}`);
// console.log(`Hashed: ${hash}`);

