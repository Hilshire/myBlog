var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var EventProxy = require('eventproxy')
var hildb = require('./server/model.js')
var dispatch = require('./server/dispatch.js')

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
app.use(bodyParser.json())
app.get(URL_ROOT, function(req, res) {
    console.log('dir root')
    res.sendFile(DIR_APP)
})
app.get(URL_LOGIN, function(req, res) {
    console.log('login')
    res.sendFile(DIR_LOGIN)
})

app.post('/manager/login', function(req, res) {
    var login_ep = new EventProxy()
    var username = req.body.username,
        password = req.body.password

    dispatch.validatePassword(username, password, login_ep)

    login_ep.on('validate', function(result) {
        if (result.isValidated) res.redirect('/manager')
            else res.send({msg: result.msg})
    })
}) 
app.listen(3000, function() {
    console.log('app is listen on port 3000')
})
