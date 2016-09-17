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

exports.queryBlogList = function(ep) {
    hildb.blog.queryList((err, row) => {
        if(delErr(err, ep)) return
        console.log(row)
        ep.emit('success', row)
    })
}

exports.addBlog = function(data, ep) {
    var data = [data.title, data.text, moment().format('l')]
    hildb.blog.add(data, err => {
        if(delErr(err,ep)) return

        ep.emit('success', {msg: 'Add Success'})
    })
}

function delErr(err, ep) {
    if(err) {
        console.log(err)
        ep.emit('Error', {msg: 'ERROR! ' + err})
        return true
    }
}
