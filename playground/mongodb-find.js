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
    
    db.collection('Todo').find({_id: new ObjectID('5b2f8b587dad756f94165af4')}).toArray().then((docs)=>{
        console.log(docs);
    }, (err)=>{
        console.log('Unable to fetch data', err);
    });

    
});
