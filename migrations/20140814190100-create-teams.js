var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('teams', {
    id: {type: 'int', primaryKey: true},
    name: 'string',
    tournament: 'int'
  }, callback)
};

exports.down = function(db, callback) {
  db.dropTable('teams', callback)
};
