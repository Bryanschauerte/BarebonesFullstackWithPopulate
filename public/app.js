var app = angular.module('bareApp', ['ngMaterial']);




app.controller('mainCtrl', function($scope, messageService){

  $scope.messages = [];

$scope.getMessages = function(){
  messageService.getMessages().then(function(messages){
    $scope.messages = messages;

  })
};
$scope.getMessages();

$scope.postMessage = function(){
  messageService.postMessage($scope.newUser).then(function(){
    $scope.getMessages();
    $scope.newMessage = {};
    $scope.postUser();

  })
}

$scope.postUser = function(){
  messageService.postMessage($scope.newUser).then(function(){
    $scope.getMessages();
    $scope.newMessage = {};
  })
};


});

app.service('messageService', function($http){

  this.getMessages = function(){
    return $http.get('/api/messages').then(function(res){
      return res.data
    })
  }
  this.postMessage = function(newMessage){
    return $http.post('/api/messages', newMessage)
  }





});
