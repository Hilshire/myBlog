var hildb = require('./model.js')
var moment = require('moment')

moment.locale('zh-cn')

exports.validatePassword = function(username, password, ep) {
    hildb.account.queryByUsername(username, function(err, row) {
        if(delErr(err, ep)) return

        var result;
        if (!row) result = {isValidated: false, msg: 'No such user'}
            else if (row.password !== password) result = {isCorrect: false, msg: 'Password error'}
                else result = {isCorrect: true, msg: 'success'}
        ep.emit('validate', result)
    })
}

exports.addBlog = function(data, ep) {
    var data = [data.title, data.text, moment().format('l')]
    hildb.blog.add(data, err => {
        if(delErr(err,ep)) return

        ep.emit('success', {msg: 'Add Success'})
    })
}

exports.delBlog = function(data, ep) {
    //TODO：如果id不存在也会显示成功
    hildb.blog.del(data.id, err => {
        if(delErr(err, ep)) return

        ep.emit('success', {msg: 'Del Success'})
    })
}

exports.updateBlog = function(data, ep) {
    hildb.blog.update([data.title, data.text, data.id], err => {
        if(delErr(err, ep)) return

        ep.emit('success', {msg: 'Update Success'})
    })
}

exports.queryBlogList = function(ep) {
    hildb.blog.queryList((err, row) => {
        if(delErr(err, ep)) return
        // console.log(row)
        ep.emit('success', row)
    })
}

exports.queryBlogById = function(data, ep) {
    hildb.blog.query(data.id, (err, row) => {
        if(delErr(err, ep)) return
        console.log(row)
        ep.emit('success', row)
    })
}

function delErr(err, ep) {
    if(err) {
        console.log(err)
        ep.emit('Error', {msg: 'ERROR! ' + err})
        return true
    }
}
