var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('matchups', {
    id: {type: 'int', primaryKey: true},
    team_a: 'int',
    team_b: 'int',
    winner: 'int'
  }, callback)
};

exports.down = function(db, callback) {
  db.dropTable('matchups', callback)
};
