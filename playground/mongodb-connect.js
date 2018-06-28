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
    
    

    db.collection('Todo').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if(err) {
            return console.log('Unable to save Todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    db.collection('User').insertOne({
        name: 'Aviral',
        age: 26,
        location: 'Bangalore'
    }, (err, result) => {
        if(err) {
            return console.log('Unable to save Todo', err);
        }
        console.log(result.ops[0]._id.getTimestamp());
    });
    client.close();
});
