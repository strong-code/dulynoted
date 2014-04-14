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
    $http.delete('/api/todos/' + id).success(function(data) {
      $scope.todos = date;
      console.log(data);
    }).error(function(data) {
      console.log(data);
    });
  };
  
}