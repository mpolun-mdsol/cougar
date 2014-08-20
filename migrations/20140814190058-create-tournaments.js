var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('tournaments', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    name: {type: 'string', notNull: true},
    game: {type: 'string', notNull: true},
    office: {type: 'string', notNull: true}
  }, callback)
};

exports.down = function(db, callback) {
  db.dropTable('tournaments', callback)
};
