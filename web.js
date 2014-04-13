var express = require("express");
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://clindsay107:password123@oceanic.mongohq.com:10024/app24104304");

//models

var Todo = mongoose.model('Todo', {
  text: String
});

//routes

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(process.env.PORT || 3000);