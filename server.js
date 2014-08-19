'use strict'
var express = require('express'),
    serveStatic = require('serve-static'),
    bookshelf = require('models/bookshelf'),
    basicAuth = require('basic-auth-connect'),
    bodyParser = require('body-parser')

var app = express(),
    port = process.env.PORT || 7777,
    router = express.Router()

// serve front-end
app.use(serveStatic('app/'))
app.use(basicAuth('mdsol', 'password*8'))
app.use(bodyParser.json())
app.set('bookshelf', bookshelf)

// Models
var Player = require('models/players')

router.get('/', function serveDefault(req, res) {
  res.json({content: 'Hello World this is a test!'})
})

router.get('/api/players', function servePlayers(req, res) {
  Player.fetchAll().then(function playersFetched(players) {
    res.json(players)
  })
})

router.get('/api/players/:id', function servePlayers(req, res) {
  Player.where('id', req.params.id).fetch().then(function playerFetched(player) {
    res.json(player)
  })
})

app.use('/', router)
app.listen(port)
console.log('cougar loading on port', port)
