var url = require('../../src/const')
var blogControl = {
    query(ep) {
        // app.post(url.QUERY_BLOG_LIST, function(req, res) {
        //     dispatch.queryBlogList(ep)
        //     ep.once('querySuccess', function(result) {
        //         res.send(result)
        //     })
        //     ep.once('Error', function(msg) {
        //         res.send(msg)
        //     })
        // })
        handlePost(url.QUERY_BLOG_LIST, function() {
            dispatch.queryBlogList(ep)
        })
    },
    add(ep) {
        // app.post(url.ADD_BLOG, function(req, res) {
        //     var data = req.body
        //     dispatch.addBlog(data, ep)
        //
        //     ep.once('addSuccess', function(result) {
        //         res.send(result)
        //     })
        //
        //     ep.once('Error', function(msg) {
        //         res.send(msg)
        //     })
        // })
        handlePost(url.ADD_BLOG, function(req, res) {
            dispatch.addBlog(req.body, ep)
        })
    }
}

function handlePost(url) {
    app.post(url, function(req, res) {
        dispatch()

        ep.once('sucess', function(result) {
            res.send(result)
        })

        ep.once('Error', function(msg) {
            res.send(msg)
        })
    })
}

exports.init = function() {
    blogControl.query()
    blogControl.add()
}
