var hildb = require('./model.js')
var moment = require('moment')

moment.locale('zh-cn')

//TODO：if err 部分有点重合，也许可以提取
exports.validatePassword = function(username, password, ep) {
    hildb.account.queryByUsername(username, function(err, row) {
        if(err) {
            console.log(err)
            ep.emit('Error', {msg: 'ERROR! ' + err})
        } else {
            var result;
            if (!row) result = {isValidated: false, msg: 'No such user'}
                else if (row.password !== password) result = {isCorrect: false, msg: 'Password error'}
                    else result = {isCorrect: true, msg: 'success'}
            ep.emit('validate', result)
        }
    })
}

exports.blog = {
    add(data, ep) {
        var data = [data.title, data.text, moment().format('l')]
        hildb.blog.add(data, err => {
            handleData(err, ep, {msg: 'Add Success'})
        })
    },
    del(data, ep) {
        //TODO：如果id不存在也会显示成功
        hildb.blog.del(data.id, err => {
            handleData(err, ep, {msg: 'Del Success'})
        })
    },
    update(data, ep) {
        hildb.blog.update([data.title, data.text, data.id], err => {
            handleData(err, ep, {msg: 'Update Success'})
        })
    },
    queryList(ep) {
        hildb.blog.queryList((err, row) => {
            handleData(err, ep, row)
        })
    },
    queryById(data, ep) {
        hildb.blog.query(data.id, (err, row) => {
            handleData(err, ep, row)
        })
    },

}

//善后: 处理错误，触发事件，回调处理数据。data是返回的数据
function handleData(err, ep, data, callback) {
    if(err) {
        console.log(err)
        ep.emit('Error', {msg: 'ERROR! ' + err})
    } else {
        if (callback) {
            console.log('show db data: ', data)
            data = callback(data)
        }
        ep.emit('success', data)
    }
}
