var hildb = require('./model.js')

exports.validatePassword = function(username, password, ep) {
    hildb.account.queryByUsername(username, function(err, row) {
        delErr(err)

        var result;
        if (!row) result = {isValidated: false, msg: 'No such user'}
            else if (row.password !== password) result = {isCorrect: false, msg: 'Password error'}
                else result = {isCorrect: true, msg: 'success'}
        ep.emit('validate', result)
    })
}

exports.queryBlogList = function() {
    hildb.blog.query()
}

exports.addBlog = function(data) {
    var data = [data.title, data.text, new Date()]
    hildb.blog.add(data, (row)=>{console.log(row)})
}

function delErr(err) {
    if(err) console.log(err)
}
