// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
var user = {name: 'avi', age: 25};
var {name, age} = user;

MongoClient.connect('mongoDB://localhost:27017/TodoApp', (err, client) => {
    if(err) {
       return console.log('Unable to connect MongoDB Server', err);
    }
    console.log('MongoDB server is connected');
    const db = client.db('TodoApp');
    
    // deleteMany
    //db.collection('Todo').deleteMany({text: 'Eat lunch'}).then(result=>console.log(result)); 

    // deleteOne
    //db.collection('Todo').deleteOne({text: 'Eat lunch'}).then(res=>console.log(res));

    // findOneAndDelete
    db.collection('Todo').findOneAndDelete({completed: false}).then(res=>console.log(res));
    
});
