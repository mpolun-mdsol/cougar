var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('players', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    name: {type: 'string', notNull: true},
    email: {type: 'string', notNull: true},
    team: {type: 'int', notNull: true}
  }, callback)
};

exports.down = function(db, callback) {
  db.dropTable('players', callback)
};
