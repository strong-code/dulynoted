'use strict';
var express = require("express");
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://clindsay107:password123@oceanic.mongohq.com:10024/app24104304");

app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
		app.use(express.methodOverride()); 						// simulate DELETE and PUT
	});

//models

var Todo = mongoose.model('Todo', {
  text: "string",
  description: "string"
});

//routes

//expose all of our TODOs
app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) res.send(err)
      
      console.log("sending todos back as JSON");
			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {
    
    if (req.body.text === undefined || req.body.text === "") {
      return res.send(422, {error: 'Title cannot be blank'});
    }

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
      description : req.body.description,
			done : false
		}, function(err, todo) {
			if (err) res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err) res.send(err)
        
        console.log("Created new todo item");
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err) res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err) res.send(err)
        
        console.log("Deleted todo item");
				res.json(todos);
			});
		});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

//kickoff server and bind to port/host (use '0.0.0.0' on nitrous, nothing for heroku)
app.listen(process.env.PORT || 3000, "0.0.0.0");