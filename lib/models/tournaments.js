'use strict'
var bookshelf = require('./bookshelf'),
    Team = require('models/teams'),
    Matchup = require('models/matchups')

module.exports = bookshelf.Model.extend({
  tableName: 'tournaments',
  defaults: {
    game: 'fifa',
    office: 'nyc'
  },
  teams: function teams() {
    return this.hasMany(Team, 'tournament')
  },
  matchups: function matchups() {
    return this.hasMany(Matchup, 'tournament')
  }
})
