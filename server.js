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
var Player = require('models/players'),
    Team = require('models/teams')

router.get('/', function serveDefault(req, res) {
  res.json({content: 'Hello World this is a test!'})
})

// Players
router.get('/api/players', function servePlayers(req, res) {
  Player.fetchAll().then(function playersFetched(players) {
    res.json(players)
  })
})

router.post('/api/players', function createPlayer(req, res) {
  Player.forge(req.body).save().then(function playerCreated(player) {
    res.json(player)
  })
})

router.param('player_id', function fetchPlayer(req, res, next, id) {
  Player.where('id', id).fetch().then(function playerFetched(player) {
    req.player = player
    next()
  })
})

router.route('/api/players/:player_id')
.get(function servePlayer(req, res) {
  res.json(req.player)
})
.put(function updatePlayer(req, res) {
  req.player.set(req.body).save().then(function playerUpdated(player) {
    res.json(player)
  })
})
.delete(function destroyPlayer(req, res) {
  var player = req.player.id
  req.player.destroy().then(function playerDestroyed() {
    res.send('Player ' + player + ' has been destroyed')
  })
})

// Teams
router.get('/api/teams', function serveTeams(req, res) {
  Team.fetchAll().then(function teamsFetched(teams) {
    res.json(teams)
  })
})

router.post('/api/teams', function createTeam(req, res) {
  Team.forge(req.body).save().then(function teamCreated(team) {
    res.json(team)
  })
})

router.param('team_id', function fetchTeam(req, res, next, id) {
  Team.where('id', id).fetch().then(function teamFetched(team) {
    req.team = team
    next()
  })
})

router.route('/api/teams/:team_id')
.get(function serveTeam(req, res) {
  res.json(req.team)
})
.put(function updateTeam(req, res) {
  req.team.set(req.body).save().then(function teamUpdated(team) {
    res.json(team)
  })
})
.delete(function destroyTeam(req, res) {
  var team = req.team.id
  req.team.destroy().then(function teamDestroyed() {
    res.send('Team ' + team + ' has been destroyed')
  })
})

app.use('/', router)
app.listen(port)
console.log('cougar loading on port', port)
