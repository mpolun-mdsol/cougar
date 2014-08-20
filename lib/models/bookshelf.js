'use strict'
var connection = process.env.DATABASE_URL || {
  host: 'localhost',
  user: 'root',
  password: '',
  database: process.env.NODE_ENV === 'test' ? 'cougar-test' : 'cougar-dev',
  charset: 'utf8'
}

var knex = require('knex')({
  client: 'pg',
  connection: connection
})

module.exports = require('bookshelf')(knex)
