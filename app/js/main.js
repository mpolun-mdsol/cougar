'use strict'
require('angular')
require('angular-strap')
require('angular-strap/dist/angular-strap.tpl')

var cougar = angular.module('cougar', [])

cougar.factory('Teams', function ($http) {
  var teams = { list: [] }

  $http.get('http://localhost:7777/api/teams/').success(function (data) {
    teams.list = data
  })

  return teams
})

cougar.controller('PlayersCtrl', function ($scope, $http, Teams) {
  $scope.teams = Teams

  $scope.addPlayer = function (player) {
    if (player) {
      $http.post('http://localhost:7777/api/players/', player, {headers: {'Content-Type': 'application/json'}})
      .success(function playerCreated(data) {
        console.log(data)
      })
      .error(function playerCreateError(data) {
        console.error(data)
      })
    }
  }
})

cougar.controller('TeamsCtrl', function ($scope, $http, $timeout, Teams) {
  $scope.teams = Teams

  $scope.status = true

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
        Teams.list.push(data)
      })
      .error(function teamCreateError(data) {
        console.error(data)
      })
    }
  }

  $scope.deleteTeam = function (team) {
    if (team) {
      $http.delete('http://localhost:7777/api/teams/' + team.id)
      .success(function teamDeleted(data) {
        var index = Teams.list.indexOf(team)
        Teams.list.splice(index, 1)

        console.log('Team' ,team.id, 'was destroyed')
      })
      .error(function teamDeleteError(data) {
        console.error(data)
      })
    }
  }
})
