var path = require('path')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var EventProxy = require('eventproxy')
var hildb = require('./server/model.js')
var dispatch = require('./server/dispatch.js')
var url = require('./src/const')

hildb.connect()
// hildb.disconnect()

var DIR_PAGE = __dirname,
    DIR_APP = path.resolve(DIR_PAGE, 'app.html'),
    DIR_MANAGER = path.resolve(DIR_PAGE, 'manager.html'),
    DIR_LOGIN = path.resolve(DIR_PAGE, 'login.html')

var app = express()

app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: false,
    secure: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 }
}))

//返回html
app.get(url.base.ROOT, function(req, res) {
    console.log('path: dir root', 'session', req.sessionID)
    res.sendFile(DIR_APP)
})
app.get(url.base.LOGIN, function(req, res) {
    console.log('path: login', 'session', req.sessionID)
    res.sendFile(DIR_LOGIN)
})
app.get(url.base.MANAGER_ALL, function(req, res) {
    console.log('path: manager', 'session', req.sessionID)
    if(!req.session.user_name) {
        res.redirect(url.base.LOGIN)
        return
    }
    res.sendFile(DIR_MANAGER)
})

// 之后会对数组里每一项调用handlepost,
// 数组第一项为对应url,
// 第二项为对应的dispatch(DAO),
// 第三项为第二项的参数, 从(data, ep)中选择一个，默认为都有
var postToHandle = [
    [url.blog.ADD, dispatch.blog.add],
    [url.blog.DEL, dispatch.blog.del],
    [url.blog.UPDATE, dispatch.blog.update],
    [url.blog.QUERY_LIST, dispatch.blog.queryList, 1],
    [url.blog.QUERY_BY_ID, dispatch.blog.queryById],
    [url.blog.ADD_TAG, dispatch.blog.addTag],

    [url.project.ADD, dispatch.project.add],
    [url.project.DEL, dispatch.project.del],
    [url.project.UPDATE, dispatch.project.update],
    [url.project.QUERY_LIST, dispatch.project.queryList, 1],
    [url.project.QUERY_BY_ID, dispatch.project.queryById]
]

// 对每一项调用handlePost,简单地传入req.body，输出dispatch返回的数据
// 以blod.add为例，每项单独写出来大概是这样的
// handlePost(url.blog.ADD, function(data, ep) {
//     dispatch.blog.add(data, ep)
// })
postToHandle.forEach(function(item) {
    var arg = item[2]
    handlePost(item[0], function(data, ep) {
        if(!arg) item[1](data, ep)
            else item[1](arguments[arg])
    })
})


// 逻辑较为复杂的control无法并入数组，在这里单独列出
// （其实主要是不想用success作为事件名，因为验证可能是失败的）
// handlePost(url.base.LOGIN, function(data, ep) {
//     var username = data.username,
//         password = data.password
//
//     dispatch.validatePassword(username, password, ep)
// }, function(res, ep) {
//     ep.once('validate', function(result) {
//         res.send(result)
//     })
// })
app.post(url.base.LOGIN, function(req, res) {
    console.log('do login', req.sessionID)
    var ep = new EventProxy()
    var username = req.body.username,
        password = req.body.password
    dispatch.validatePassword(username, password, ep)
    ep.once('validate', function (result) {
        if(result.passValidate) req.session.user_name = username
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
        console.log('handlePost', url, req.sessionID)
        if(!req.session.user_name) {
            res.send({error:1, msg:'You shoul login'})
            return
        }

        //这里只能用once。如果事件不解绑，res对象惠一直存在，
        //然后在新请求到来时报错。
        ep.once('success', function(result) {
            res.send(result)
        })
        ep.once('Error', function(msg) {
            res.send(msg)
        })

        //callback必须在事件绑定之后。因为callback内通常会触发事件。
        callback(req.body, ep)

        for(key in event) {
            event[key](res, ep)
        }
    })
}
