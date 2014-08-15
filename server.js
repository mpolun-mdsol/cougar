'use strict'
var express = require('express'),
    serveStatic = require('serve-static'),
    bookshelf = require('./lib/models/bookshelf')

var app = express(),
    port = process.env.PORT || 7777,
    router = express.Router()

// serve front-end
app.use(serveStatic('app/'))
app.set('bookshelf', bookshelf)

// Models
var Player = require('./lib/models/players')

router.get('/', function serveDefault(req, res) {
  res.json({content: 'Hello World!'})
})

router.get('/players', function servePlayers(req, res) {
  Player.fetchAll().then(function callback(players) {
    res.json(players)
  })
})

app.use('/', router)
app.listen(port)
console.log('cougar loading on port', port)
