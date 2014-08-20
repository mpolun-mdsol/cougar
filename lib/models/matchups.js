'use strict'
var bookshelf = require('./bookshelf'),
    Team = require('models/teams'),
    Tournament = require('models/tournaments')

module.exports = bookshelf.Model.extend({
  tableName: 'matchups',
  teamA: function teamA(){
    return this.hasOne(Team, 'team_a')
  },
  teamB: function teamB(){
    return this.hasOne(Team, 'team_b')
  },
  tournament: function tournament() {
    return this.belongsTo(Tournament, 'tournament')
  }
})
