var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var hildb = require('./server/model.js')
var route = require('./server/control')


hildb.connect()
// hildb.disconnect()

var app = express()

app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: false,
    secure: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 }
}))

route(app)

app.listen(3000, function() {
    console.log('app is listen on port 3000')
})

module.exports = app
