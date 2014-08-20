'use strict'
require('angular')
require('angular-strap')
require('angular-strap.tpl')

var cougar = angular.module('cougar', [])

cougar.controller('PlayersCtrl', function ($scope, $http) {
  $scope.addPlayer(player) {
    if (player) {
      $http.post('http://localhost:7777/api/players/', player, {headers: {'Content-Type': 'application/json'}})
      .success(function playerCreated(data) {
        console.log(data)
      })
      .error(function playerCreateError(data) {
        console.log(data)
      })
    }
  }
})
