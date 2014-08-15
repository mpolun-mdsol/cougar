var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('tournaments', {
    id: {type: 'int', primaryKey: true},
    name: 'string',
    game: 'string',
    office: 'string'
  }, callback)
};

exports.down = function(db, callback) {
  db.dropTable('tournaments', callback)
};
