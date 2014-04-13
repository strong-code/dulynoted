var express = require("express");
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://clindsay107:password123@oceanic.mongohq.com:10024/app24104304");

//models

var Todo = mongoose.model('Todo', {
  text: String
});

//routes

//expose all of our TODOs
app.get('/api/todos', function(req, res) {
  Todo.find(function(err, todos) {
    if (err)
      res.send(err);
    
    res.json(todos);
  });
});

//create a TODO item
app.post('/api/todos', function(req, res) {
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo) {
    if (err)
      res.send(err);
      
    //refresh our list of TODOs on the creation of a new one
    Todo.find(function(err, todos) {
      if (err)
        res.send(err);
      res.json(todos);
    });
  });
});

//delete a TODO item

app.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function(err, todo) {
    if (err)
      res.send(err);
    
    Todo.find(function(err, todos) {
      if (err)
        res.send(err);
      res.json(todos);
    });
  });
});

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(process.env.PORT || 3000, "0.0.0.0");