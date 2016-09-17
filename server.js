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
    URL_MANAGER = '/manager/*',
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
app.get(URL_MANAGER, function(req, res) {
    console.log('manager')
    res.sendFile(DIR_MANAGER)
})

//TODO: control分离
handlePost(url.ADD_BLOG, function(data, ep) {
    dispatch.addBlog(data, ep)
})
handlePost(url.DEL_BLOG, function(data, ep) {
    dispatch.delBlog(data, ep)
})
handlePost(url.UPDATE_BLOG, function(data, ep) {
    dispatch.updateBlog(data, ep)
})
handlePost(url.QUERY_BLOG_LIST, function(data, ep) {
    dispatch.queryBlogList(ep)
})
handlePost(url.QUERY_BLOG_BY_ID, function(data, ep) {
    dispatch.queryBlogById(data, ep)
})

handlePost(url.LOGIN, function(data, ep) {
    var username = data.username,
        password = data.password

    dispatch.validatePassword(username, password, ep)
}, function(res, ep) {
    ep.once('validate', function(result) {
        res.send(result)
    })
})

app.listen(3000, function() {
    console.log('app is listen on port 3000')
})

// 处理post请求。无论成功还是失败都把结果返回去。
// 可以增加多个事件
function handlePost(url, callback) {
    var ep = new EventProxy()
    var event = Array.prototype.slice.call(arguments, 2)

    app.post(url, function(req, res) {
        callback(req.body, ep)

        ep.once('success', function(result) {
            res.send(result)
        })

        ep.once('Error', function(msg) {
            res.send(msg)
        })

        for(key in event) {
            event[key](res, ep)
        }
    })
}
