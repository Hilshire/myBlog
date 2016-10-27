var server = require('./server.js')
var url = require('../src/const')
var path = require('path')
var EventProxy = require('eventproxy')

module.exports = function(app) {

    var DIR_PATH = __dirname,
        ROOT_PATH = path.resolve(DIR_PATH, '../'),
        DIR_APP = path.resolve(ROOT_PATH, 'app.html'),
        DIR_MANAGER = path.resolve(ROOT_PATH, 'manager.html'),
        DIR_LOGIN = path.resolve(ROOT_PATH, 'login.html')

    // 之后会对数组里每一项调用handlepost | 或者handleget,将url和server连接起来
    // 数组第一项为对应url,
    // 第二项为对应的server,
    // 第三项为调用的方法名，
    // 第四项为方法的参数, 从handlepost.arguments中选择一个，默认为都有
    // server的方法的参数可能为data或(data,ep)，如果不加控制会报错
    var getReqs = [
        [url.app.QUERY_BLOG_LIST, server.blog, 'queryList', 1],
        [url.app.QUERY_BLOG, server.blog, 'queryById'],
        [url.app.QUERY_ARTICLE_LIST, server.article, 'queryList', 1],
        [url.app.QUERY_ARTICLE, server.article, 'queryById'],
        [url.app.QUERY_TIPS_LIST, server.tips, 'queryList', 1],
        [url.app.QUERY_TIPS, server.tips, 'queryById'],
        [url.app.QUERY_ABOUT, server.about, 'query', 1],
        [url.app.QUERY_BANNER, server.banner, 'query', 1],

        [url.blog.DEL, server.blog, 'del'],
        [url.blog.QUERY_LIST, server.blog, 'queryList', 1],
        [url.blog.QUERY_BY_ID, server.blog, 'queryById'],
        [url.blog.ADD_TAG, server.blog, 'addTag'],
        [url.blog.DEL_TAG, server.blog, 'delTag'],

        [url.article.DEL, server.article, 'del'],
        [url.article.QUERY_LIST, server.article, 'queryList', 1],
        [url.article.QUERY_BY_ID, server.article, 'queryById'],
        [url.article.ADD_TAG, server.article, 'addTag'],
        [url.article.DEL_TAG, server.article, 'delTag'],

        [url.tips.DEL, server.tips, 'del'],
        [url.tips.QUERY_LIST, server.tips, 'queryList', 1],
        [url.tips.QUERY_BY_ID, server.tips, 'queryById'],
        [url.tips.ADD_TAG, server.tips, 'addTag'],
        [url.tips.DEL_TAG, server.tips, 'delTag'],

        [url.about.QUERY, server.about, 'query', 1],

        [url.banner.QUERY_LIST, server.banner, 'queryList', 1],
        [url.banner.DEL, server.banner, 'del']
    ]

    var postReqs = [
        [url.blog.ADD, server.blog, 'add'],
        [url.blog.UPDATE, server.blog, 'update'],
        [url.blog.ADD_TAG, server.blog, 'addTag'],

        [url.article.ADD, server.article, 'add'],
        [url.article.UPDATE, server.article, 'update'],

        [url.tips.ADD, server.tips, 'add'],
        [url.tips.UPDATE, server.tips, 'update'],

        [url.about.UPDATE, server.about, 'update'],

        [url.banner.ADD, server.banner, 'add'],
        [url.banner.UPDATE, server.banner, 'update']
    ]

    // 对每一项调用handlePost | handleGet, 简单地传入req.body，输出server返回的数据
    // 以blod.add为例，每项单独写出来大概是这样的
    // handlePost(url.blog.ADD, function(data, ep) {
    //     server.blog.add(data, ep)
    // })
    getReqs.forEach(function (getReq) {
        var url = getReq[0],
            server = getReq[1],
            method = getReq[2],
            argIndex = getReq[3]
        //这里不能写成箭头函数，this绑定会使得arguments指向外层的function
        handleGet(url, function(data, ep) {
            if(!argIndex) server[method](data, ep)
                else server[method](arguments[argIndex])
        })
    })

    postReqs.forEach(function(item) {
        var url = item[0],
            server = item[1],
            method = item[2],
            argIndex = item[3]

        handlePost(url, function(data, ep) {
            if(!argIndex) server[method](data, ep)
                else server[method](arguments[argIndex])
        })
    })

    // 逻辑较为复杂的control无法并入数组，在这里单独列出
    // （其实主要是不想用success作为事件名，因为验证可能是失败的）
    app.post(url.base.LOGIN, function(req, res) {
        console.log('do login', req.sessionID)
        var ep = new EventProxy()
        var username = req.body.username,
            password = req.body.password
        server.validatePassword(username, password, ep)
        ep.once('validate', function (result) {
            if(result.passValidate) req.session.user_name = username
            res.send(result)
        })
    })

    //返回html
    app.get('/manager/login', function(req, res) {
        console.log('path: login', 'session', req.sessionID)
        if(req.session.user_name) {
            res.redirect(url.base.MANAGER)
            return
        }
        res.sendFile(DIR_LOGIN)
    })
    app.get('/manager*', function(req, res) {
        console.log('path: manager', 'session', req.sessionID)
        if(!req.session.user_name) {
            res.redirect(url.base.LOGIN)
            return
        }
        res.sendFile(DIR_MANAGER)
    })
    app.get('/*', function(req, res) {
        console.log('path: dir root', 'session', req.sessionID)
        res.sendFile(DIR_APP)
    })

    function handlePost(url, callback) {
        var ep = new EventProxy()

        app.post(url, function(req, res) {
            console.log('handlePost', url, req.sessionID)
            if(req.url.indexOf('manager') !== -1) {
                if(!req.session.user_name) {
                    res.send({error:1, msg:'You shoul login'})
                    return
                }
            }

            //这里只能用once。如果事件不解绑，res对象惠一直存在，
            //然后在新请求到来时报错。
            ep.once('success', result => {
                res.send(result)
            })
            ep.once('Error', err => {
                res.send({error: 1, msg: err.message})
            })

            //callback必须在事件绑定之后。因为callback内通常会触发事件。
            callback(req.body, ep)
        })
    }

    function handleGet(url, callback) {
        var ep = new EventProxy()
        app.get(url, function (req, res) {
            ep.once('success', result => {
                res.json(result)
            })
            ep.once('Error', (err) => {
                throw err
                res.json({error:1, msg: err.message})
            })

            callback(req.query, ep)
        })
    }

}
