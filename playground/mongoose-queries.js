const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// const id = '5b3610f23f17831b20b998579';

// Todo.find({_id: id}).then(todos=>{
//     console.log('Todos', todos);
// });

// Todo.findOne({_id: id}).then(todo=>{
//     console.log('Todo-', todo);
// });

// if(!ObjectID.isValid(id)){
//     console.log('Id not valid');
// }

// Todo.findById(id).then(todo=>{
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo', todo);
// });

const userId = '5b34e3433ae0be4ab06605370';
if(!ObjectID.isValid(userId)) {
    console.log('User id is not valid');
} else {
    User.findById(userId).then(user=>{
        if(!user){
            return console.log('user not found');
        }
        console.log('User', user);
    })
}