'use strict'
var bookshelf = require('./bookshelf'),
    Tournament = require('models/tournaments')

module.exports = bookshelf.Model.extend({
  tableName: 'teams',
  tournament: function tournament() {
    return this.belongsTo(Tournament, 'tournament')
  }

})
