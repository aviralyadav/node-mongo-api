const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then(res=>{
//     console.log(res);
// }, err =>{
//     console.log(err);
// });

// findOneAndRemove

Todo.findByIdAndRemove('5b3a1b1f4df9d1bb692b00b6').then(res=>{
    console.log(res);
}, err=>console.log(err));