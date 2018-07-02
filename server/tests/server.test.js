var expect = require('expect');
var request = require('supertest');

var app = require('./../server').app;
var {Todo} = require('./../models/todo');

var todos = [
    {
        text: "Test todo text"
    },
    {
        text: "Test todo text1"
    }
];

beforeEach(done=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos', ()=>{
    it('should insert new todo', (done)=>{
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect(res=>{
            expect(res.body.text).toBe(text);
        })
        .end((err, doc)=>{
            if(err){
               return done(err);
            }
            Todo.find({text}).then(res=>{
                expect(res.length).toBe(1);
                expect(res[0].text).toBe(text);
                done();
            }).catch(e=>done(e));   
        })
    });
    it('should not create todo with invalid body data', (done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                Todo.find().then(res=>{
                    expect(res.length).toBe(2);
                    done();
                }).catch(e=>done(e));
            })
    });
});

// describe('GET /todos', ()=>{
//     it('should get all todos', (done)=>{
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect(res=>{
//                 expect(res.body.todos[0].text).toBe('This is from postman');
//             })
//             .end(done);
//     });
// });