'use strict'
var bookshelf = require('./bookshelf'),
    Team = require('models/teams')

module.exports = bookshelf.Model.extend({
  tableName: 'players',
  team: function team() {
    return this.belongsTo(Team, 'team')
  }
})
