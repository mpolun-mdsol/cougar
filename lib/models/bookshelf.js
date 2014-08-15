var connection = process.env.DATABASE_URL || {
  host: 'localhost',
  user: process.env.USER || 'mpolun',
  password: '',
  database: process.env.NODE_ENV === 'test' ? 'cougar-test' : 'cougar-dev',
  charset: 'utf8'
}

var knex = require('knex')({
  client: 'pg',
  connection: connection
})

module.exports = require('bookshelf')(knex)
