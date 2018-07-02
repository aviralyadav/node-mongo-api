var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var router = app.router;

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {Message} = require('./models/message');
var {Product} = require('./models/product');

app.use(cors());
app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then(doc=>{
        res.send(doc);
    }, e=>{
        res.status(400).send(e);
    });
});

app.post('/messages', (req, res)=>{
    var newMessage = new Message({
        message: req.body.message
    });
    newMessage.save().then(doc=>{
        res.send(doc);
    }, e=>{
        res.send(e);
    });
});

app.get('/messages', (req, res)=>{
    Message.find({}).then(messages=>{
        res.send({messages});
    }, e=>res.send(e));
});

app.get('/todos', (req, res)=>{
    Todo.find().then(todos=>{
        res.send({todos});
    }, err=>{
        res.status(400).send(err);
    });
});

app.post('/products', (req, res)=>{
    var newProduct = new Product(req.body);
    newProduct.save().then(doc=>{res.send(doc)}, err=>res.send(err));
});

app.get('/products', (req, res)=>{
    Product.find({}).then(products=>{res.send({products})}, err=>res.send(err));
});

app.listen(process.env.PORT || 3001, ()=>{
    console.log('Server started at 3001');
});

module.exports = {app};