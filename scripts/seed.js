var Tournament = require('models/tournaments'),
    Team       = require('models/teams'),
    Player     = require('models/players'),
    Matchup    = require('models/matchups'),
    Promise    = require('bluebird')

new Tournament({
  name: 'Test Tournament'
}).save().then(function(tournament){
  return Promise.all([new Team({
    name: 'team 1',
    tournament: tournament.id
  }).save(), new Team({
    name: 'team 2',
    tournament: tournament.id
  }).save()])
}).then(function(teams){
  return Promise.all([
    new Player({
      name: 'player 1',
      email: 'player1@mdsol.com',
      team: teams[0].id
    }).save(),
    new Player({
      name: 'player 2',
      email: 'player2@mdsol.com',
      team: teams[1].id
    }).save()
  ])
}).catch(function(err){
  console.error('error:', err)
}).finally(function(){
  process.exit(0)
})
