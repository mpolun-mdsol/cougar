var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('teams', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    name: {type: 'string', notNull: true},
    tournament: {type: 'int', notNull: true},
  }, callback)
};

exports.down = function(db, callback) {
  db.dropTable('teams', callback)
};
