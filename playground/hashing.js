const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var data = {
    id: 10
}

var password = 'abc123';

bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, (err, hash)=>{
        console.log(hash);
    });
});

var hashedPwd = '$2a$10$Nj0PxbFpcbKs9BUBERNH7uHovHgpVVCb1/UZp.ZHEbr1od9j7YmnO';

bcrypt.compare(password, hashedPwd, (err, hash)=>{
    console.log(hash);
});

// var token = jwt.sign(data, 'abc12345');
// console.log(token);
// var decoded = jwt.verify(token, 'abc12345');

// console.log('decoded', decoded);
// var msg = 'I am Aviral!.';

// var hash = SHA256(msg).toString();

// console.log(`Message: ${msg}`);
// console.log(`Hashed: ${hash}`);

