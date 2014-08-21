'use strict'
require('angular')
require('angular-strap')
require('angular-strap/dist/angular-strap.tpl')

var cougar = angular.module('cougar', [])

cougar.controller('PlayersCtrl', function ($scope, $http) {
  $scope.addPlayer = function (player) {
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

cougar.controller('TeamsCtrl', function ($scope, $http, $timeout) {
  var updateTeamsList = function () {
    $http.get('http://localhost:7777/api/teams/').success(function (data) {
      $scope.teams = data
    })
  }

  $scope.teams = updateTeamsList()
  $scope.status = true;

  $scope.showMessage = function () {
    $scope.status = false 
    $timeout(function () { $scope.status = true }, 1000)
  }

  $scope.addTeam = function (team) {
    if (team) {
      $http.post('http://localhost:7777/api/teams/', team, {headers: {'Content-Type': 'application/json'}})
      .success(function teamCreated(data) {
        console.log(data)
        $scope.message = team.name + ' was successfully added'
        $scope.team.name = ''
        updateTeamsList()
      })
      .error(function teamCreateError(data) {
        console.log(data)
      })
    }
  }

  $scope.deleteTeam = function (team) {
    if (team) {
      $http.delete('http://localhost:7777/api/teams/' + team.id)
      .success(function (data) {
        console.log(data)
        $scope.message = team.name + ' was successfully deleted'
        updateTeamsList()
      })
    }
  }
})
