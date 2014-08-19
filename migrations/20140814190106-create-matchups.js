var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('matchups', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    team_a: 'int',
    team_b: 'int',
    winner: 'int',
    score_a: 'int',
    score_b: 'int',
    tournament: {type: 'int', notNull: true},
    parent_matchup: 'int'
  }, callback)
};

exports.down = function(db, callback) {
  db.dropTable('matchups', callback)
};
