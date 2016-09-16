var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var EventProxy = require('eventproxy')
var hildb = require('./server/model.js')
var dispatch = require('./server/dispatch.js')
var url = require('./src/const')

hildb.connect()
// hildb.account.query(1, function(data) {
//     console.log(data)
// })
// hildb.disconnect()

var URL_ROOT = '/',
    URL_MANAGER = '/manager',
    URL_LOGIN = path.resolve(URL_MANAGER, 'login')

var DIR_PAGE = __dirname,
    DIR_APP = path.resolve(DIR_PAGE, 'app.html'),
    DIR_MANAGER = path.resolve(DIR_PAGE, 'manager.html'),
    DIR_LOGIN = path.resolve(DIR_PAGE, 'login.html')


var app = express()
var ep = new EventProxy()

app.use(bodyParser.json())
app.get(URL_ROOT, function(req, res) {
    console.log('dir root')
    res.sendFile(DIR_APP)
})
app.get(URL_LOGIN, function(req, res) {
    console.log('login')
    res.sendFile(DIR_LOGIN)
})
app.get(URL_MANAGER, function(req, res) {
    console.log('manager')
    res.sendFile(DIR_MANAGER)
})

app.post(url.LOGIN, function(req, res) {
    var username = req.body.username,
        password = req.body.password

    dispatch.validatePassword(username, password, ep)

    ep.on('validate', function(result) {
        res.send(result)
    })
})
app.post(url.ADD_BLOG, function(req, res) {
    var data = req.body
    dispatch.addBlog(data, ep)

    ep.on('addBlog', function(result) {
        res.send(result)
    })
})

app.listen(3000, function() {
    console.log('app is listen on port 3000')
})
