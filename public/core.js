'use strict';

var todoModule = angular.module('myApp', []);

function mainController($scope, $http) {
  $scope.formData = {};

  //fetch todos on page load
  $http.get('/api/todos').success(function(data) {
    $scope.todos = data;
    console.log(data);
  }).error(function(data) {
    console.log('Error: ' + data);
  });

  //create new todo from form data
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData).success(function(data) {
      $scope.formData = {};
      $scope.todos = data;
      console.log(data);
    }).error(function(data) {
      console.log(data);
    });
  };

  //delete selected todo
  $scope.deleteTodo = function(id) {
    if (window.confirm("Delete this task?")) {
      $http.delete('/api/todos/' + id).success(function(data) {
        $scope.todos = data;
        console.log(data);
      }).error(function(data) {
        console.log(data);
      });
    }
  };
  
  //un-hide the description box for a todo
  $scope.toggleDescription = function($event, todo) {
    var $children = $($event.currentTarget).children();
    var $description = $children.last();
    var $icon = $children.first();
    
    $icon.toggleClass('glyphicon-chevron-down');
    $icon.toggleClass('glyphicon-chevron-up');
    $description.text(todo.description);
    $description.slideToggle('fast');
  };

}