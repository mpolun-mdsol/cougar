'use strict'
var express = require('express'),
    serveStatic = require('serve-static')

var app = express(),
    port = process.env.PORT || 7777,
    router = express.Router()

// serve front-end
app.use(serveStatic('app/'))

router.get('/', function serveDefault(req, res) {
  res.json({content: 'Hello World!'})
})

app.use('/', router)
app.listen(port)
console.log('cougar loading on port', port)
