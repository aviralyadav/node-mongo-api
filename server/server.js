require('./config/config');

const _ = require('lodash');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

var {ObjectID} = require('mongodb');
const port = process.env.PORT;
// var router = app.router;

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {Message} = require('./models/message');
var {Product} = require('./models/product');
var {SIMAGE} = require('./models/simage');
var {Order} = require('./models/order');
var {authenticate} = require('./middleware/authenticate');

app.use(cors());
app.use(bodyParser.json());

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

app.post('/todos', authenticate, (req, res)=>{
    var todo = new Todo({
        text: req.body.text,
        _creater: req.user._id
    });
    todo.save().then(doc=>{
        res.send(doc);
    }, e=>{
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res)=>{
    Todo.find({
        _creater: req.user._id
    }).then(todos=>{
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

app.get('/products/:id', (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Product.findById(id).then(product=>{
        if(!product) {
            return res.status(404).send();
        }
        res.send(product);
    }).catch(err=>{
        res.status(400).send();
    });
});

app.get('/todos/:id', authenticate, (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOne({
        _id: id,
        _creater: req.user._id
    }).then(todo=>{
        if(!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    }).catch(err=>{
        res.status(400).send();
    });
});

app.delete('/todos/:id', authenticate, (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOneAndRemove({
        _id: id,
        _creater: req.user._id
    }).then(todo=>{
        if(!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    }, err=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate, (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findOneAndUpdate({
        _id: id,
        _creater: req.user._id
    }, {$set: body}, {new: true})
        .then(todo=>{
            if(!todo){
                return res.status(404).send()
            }
            res.send({todo});
        },err=>{
            res.status(400).send();
        });
});

app.get('/images', (req, res)=>{
    SIMAGE.find({}).then(imgs=>{
        res.send(imgs);
    });
});

app.post('/images', (req, res)=>{
    var newS = new SIMAGE(req.body);
    newS.save().then(img=>{
        res.send(img);
    });
});

app.post('/users', (req, res)=>{
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(user);
    }).catch(err=>{
        res.status(400).send(err);
    });
});

app.get('/users/me', authenticate, (req, res)=>{
    res.send(req.user);
});

app.post('/users/login', (req, res)=>{
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then(user=>{
        return user.generateAuthToken().then(token=>{
            res.header('x-auth', token).send(user);
        })
    })
    .catch(err=>{
        res.status(400).send();
    })
});

app.delete('/users/me/token', authenticate, (req, res)=>{
    var token = req.token;
    var user = req.user;
    user.removeToken(token).then(()=>{
        res.send();
    }, (err)=>{
        res.status(400).send();
    });
});

app.post('/order', (req, res) => {
    //var body = _.pick(req.body, ['orderDetailsId']);
});

app.listen(port, ()=>{
    console.log(`Server started at ${port}`);
});

module.exports = {app};