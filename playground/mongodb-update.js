// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
var user = { name: 'avi', age: 25 };
var { name, age } = user;

MongoClient.connect('mongoDB://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect MongoDB Server', err);
    }
    console.log('MongoDB server is connected');
    const db = client.db('TodoApp');

    db.collection('User').findOneAndUpdate(
        { _id: new ObjectID('5b2f8db144ccc616a034aea6') },
        { $set: { name: 'aviral' } }, {
            returnOriginal: false
        }
    ).then(res => {
        console.log(res);
    });

    db.collection('User').findOneAndUpdate({_id: new ObjectID('5b2f8db144ccc616a034aea6')},{
        $set: {name: 'Mack'}, $inc: {age: 2}
    },{returnOriginal: false}).then(res=>console.log(res));

});
