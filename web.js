var express = require("express");
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://clindsay107:password123@oceanic.mongohq.com:10024/app24104304");

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000, "0.0.0.0");