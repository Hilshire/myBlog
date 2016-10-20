var dispatch = require('./dispatch.js')
var url = require('../src/const')
var path = require('path')
var EventProxy = require('eventproxy')

module.exports = function(app) {

    var DIR_PATH = __dirname,
        ROOT_PATH = path.resolve(DIR_PATH, '../'),
        DIR_APP = path.resolve(ROOT_PATH, 'app.html'),
        DIR_MANAGER = path.resolve(ROOT_PATH, 'manager.html'),
        DIR_LOGIN = path.resolve(ROOT_PATH, 'login.html')

    // 之后会对数组里每一项调用handlepost | 或者handleget,将url和dispatch连接起来
    // 数组第一项为对应url,
    // 第二项为对应的dispatch,
    // 第三项为调用的方法名，
    // 第四项为方法的参数, 从handlepost.arguments中选择一个，默认为都有
    // dispatch的方法的参数可能为data或(data,ep)，如果不加控制会报错
    var getReqs = [
        [url.app.QUERY_BLOG_LIST, dispatch.blog, 'queryList', 1],
        [url.app.QUERY_BLOG, dispatch.blog, 'queryById'],
        [url.app.QUERY_ARTICLE_LIST, dispatch.article, 'queryList', 1],
        [url.app.QUERY_ARTICLE, dispatch.article, 'queryById'],
        [url.app.QUERY_TIPS_LIST, dispatch.tips, 'queryList', 1],
        [url.app.QUERY_TIPS, dispatch.tips, 'queryById'],
        [url.app.QUERY_ABOUT, dispatch.about, 'query', 1],
        [url.app.QUERY_BANNER, dispatch.banner, 'query', 1],

        [url.blog.DEL, dispatch.blog, 'del'],
        [url.blog.QUERY_LIST, dispatch.blog, 'queryList', 1],
        [url.blog.QUERY_BY_ID, dispatch.blog, 'queryById'],

        [url.article.DEL, dispatch.article, 'del'],
        [url.article.QUERY_LIST, dispatch.article, 'queryList', 1],
        [url.article.QUERY_BY_ID, dispatch.article, 'queryById'],

        [url.tips.DEL, dispatch.tips, 'del'],
        [url.tips.QUERY_LIST, dispatch.tips, 'queryList', 1],
        [url.tips.QUERY_BY_ID, dispatch.tips, 'queryById'],

        [url.about.QUERY, dispatch.about, 'query', 1],

        [url.banner.QUERY_LIST, dispatch.banner, 'queryList', 1],
        [url.banner.DEL, dispatch.banner, 'del']
    ]

    var postReqs = [
        [url.blog.ADD, dispatch.blog, 'add'],
        [url.blog.UPDATE, dispatch.blog, 'update'],
        [url.blog.ADD_TAG, dispatch.blog, 'addTag'],

        [url.article.ADD, dispatch.article, 'add'],
        [url.article.UPDATE, dispatch.article, 'update'],

        [url.tips.ADD, dispatch.tips, 'add'],
        [url.tips.UPDATE, dispatch.tips, 'update'],

        [url.about.UPDATE, dispatch.about, 'update'],

        [url.banner.ADD, dispatch.banner, 'add'],
        [url.banner.UPDATE, dispatch.banner, 'update']
    ]

    // 对每一项调用handlePost | handleGet, 简单地传入req.body，输出dispatch返回的数据
    // 以blod.add为例，每项单独写出来大概是这样的
    // handlePost(url.blog.ADD, function(data, ep) {
    //     dispatch.blog.add(data, ep)
    // })
    getReqs.forEach(function (getReq) {
        var url = getReq[0],
            dispatch = getReq[1],
            method = getReq[2],
            argIndex = getReq[3]
        //这里不能写成箭头函数，this绑定会使得arguments指向外层的function
        handleGet(url, function(data, ep) {
            if(!argIndex) dispatch[method](data, ep)
                else dispatch[method](arguments[argIndex])
        })
    })

    postReqs.forEach(function(item) {
        var url = item[0],
            dispatch = item[1],
            method = item[2],
            argIndex = item[3]

        handlePost(url, function(data, ep) {
            if(!argIndex) dispatch[method](data, ep)
                else dispatch[method](arguments[argIndex])
        })
    })

    // 逻辑较为复杂的control无法并入数组，在这里单独列出
    // （其实主要是不想用success作为事件名，因为验证可能是失败的）
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
        // var event = Array.prototype.slice.call(arguments, 2)

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
            ep.once('Error', msg => {
                res.send(msg)
            })

            //callback必须在事件绑定之后。因为callback内通常会触发事件。
            callback(req.body, ep)

            // for(key in event) {
            //     event[key](res, ep)
            // }
        })
    }

    function handleGet(url, callback) {
        var ep = new EventProxy()
        app.get(url, function (req, res) {
            ep.once('success', result => {
                res.json(result)
            })
            ep.once('Error', (msg) => {
                res.json(msg)
            })

            callback(req.query, ep)
        })
    }
    
}
