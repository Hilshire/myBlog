/*
 * 对model进行简单的处理。包含最基础的业务逻辑
 */

var hildb = require('./model.js')
var moment = require('moment')

var summaryHook = '<!--summary-->'
moment.locale('zh-cn')

function Dispatch(model) {
    this.model = model
}
Dispatch.prototype = {
    add(defer, data) {
        this.model.add(data, err => {
            return handleData(err, defer, {success: 1, msg: 'Add Success'})
        })
    },
    del(defer, data) {
        //TODO：如果id不存在也会显示成功
        this.model.del(data.id, err => {
            return handleData(err, defer, {success: 1, msg: 'Del Success'})
        })
    },
    update(defer, data) {
        this.model.update(data, err => {
            return handleData(err, defer, {success: 1, msg: 'Update Success'})
        })
    },
    queryList(defer) {
        this.model.queryList((err, row) => {
            return handleData(err, defer, row)
        })
    },
    queryById(defer, data) {
        this.model.query(data.id, (err, row) => {
            return handleData(err, defer, row)
        })
    }
}

var blog = new Dispatch(hildb.blog)
blog.add = function (defer, data) {
    var title = data.title,
        content = data.content,
        summary = getSummary(content),
        model = this.model,
        id = data.id?data.id:null

    var data = [id, title, content, summary, moment().format('l')]
    model.add(data, err => {
        return handleData(err, defer, {success: 1, msg: 'Add Success'})
    })
}
blog.update = function (defer, data) {
    var title = data.title,
        content = data.content,
        summary = getSummary(content),
        model = this.model

    model.update([title, content, summary, data.id], err => {
        return handleData(err, defer, {success: 1, msg: 'Update Success'})
    })
}

var article = new Dispatch(hildb.article)
article.add = function(defer, data) {
    var data = [data.id?data.id:null, data.title, data.content, moment().format('l')]
    this.model.add(data, err => {
        return handleData(err, defer, {success: 1, msg: 'Add Success'})
    })
}
article.update = function(defer, data) {
    var data = [data.title, data.content, data.id]
    this.model.update(data, (err, row) => {
        return handleData(err, defer, {success: 1, msg: 'Update Success'})
    })
}

var tips = new Dispatch(hildb.tips)
tips.add = function(defer, data) {
    var data = [data.id?data.id:null ,data.title, data.content, moment().format('l')]
    this.model.add(data, err => {
        return handleData(err, defer, {success: 1, msg: 'Add Success'})
    })
}
tips.update = function(defer, data) {
    var data = [data.title, data.content, data.id]
    this.model.update(data, (err, row) => {
        return handleData(err, defer, {success: 1, msg: 'Update Success'})
    })
}

var about = {
    query(defer) {
        hildb.about.query((err, row) => {
            return handleData(err, defer, row)
        })
    },
    update(defer, data) {
        hildb.about.update(data.content, (err, row) => {
            return handleData(err, defer, {success: 1, msg: 'Update Success'})
        })
    }
}

var banner = new Dispatch(hildb.banner)
banner.query = function(defer) {
    var model = this.model

    model.queryRandomRow((err, row) => {
        return handleData(err, defer, row)
    })
}
banner.add = function(defer, data) {
    var model = this.model,
        content = data.content,
        id = data.id?data.id:null

    model.add([id, content], (err, row) => {
        return handleData(err, defer, {success:1, msg: 'Add Success'})
    })
}
banner.update = function(defer, data) {
    var model = this.model,
        content = data.content,
        id = data.id
    var data = [content, id]
    model.update(data, (err, row) => {
        return handleData(err, defer, {success: 1, msg: 'Update Success'})
    })
}

var tag = new Dispatch(hildb.tag)
tag.add = function(defer, data) {
    if(!defer.promise) {
        data = defer
        defer = null
    }
    var model = this.model,
        type = data.text,
        id = data.id?data.id:null
    var data = [id, type]
    model.add(data, (err, row) => {
        return handleData(err, defer, {success: 1, msg:' Add Success'})
    })
}
tag.queryByType = function(defer, data) {
    if(!defer.promise) {
        data = defer
        defer = null
    }
    var model = this.model,
        type = data.text
    model.queryByType(type, (err, row) => {
        return handleData(err, defer, row)
    })
}

var blogTag = new Dispatch(hildb.blogTag)
blogTag.add = function (tagId, relationId) {
    var model = this.model,
        data = [tagId, relationId]
    model.add(data, (err, row) => {
        return handleData(err, null, row)
    })

}
blogTag.queryByTagId = function (tagId) {
    var model = this.model
    model.queryByTagId(tagId, (err, row) => {
        return handleData(err, null ,row)
    })
}

//TODO：if err 部分有点重合，也许可以提取
function validatePassword(username, password, ep) {
    hildb.account.queryByUsername(username, function(err, row) {
        if(err) {
            console.log(err)
            ep.emit('Error', {msg: 'ERROR! ' + err})
        } else {
            var result;
            if (!row) result = {paseValidate: false, msg: 'No such user'}
                else if (row.password !== password) result = {passValidate: false, msg: 'Password error'}
                    else result = {passValidate: true, msg: 'success'}
            ep.emit('validate', result)
        }
    })
}

//善后: 处理错误，触发事件，回调处理数据。data是返回的数据
function handleData(err, defer, data, callback) {

    if(err) {
        console.log(err)
        if(defer && defer.promise) {

            defer.reject({error:1, msg: 'ERROR! ' + err})
        } else {
            return {error:1, msg: 'ERROR! ' + err}
        }
    } else {
        console.log('db return data: ', data)
        if (callback) {
            data = callback(data)
        }
        if(defer && defer.promise) {

            defer.resolve(data)
        } else {

            return data
        }
    }
}

//从markdown截取Summary
function getSummary(content) {
    var endPoint = content.indexOf(summaryHook)
    if (endPoint === -1) return ''
        else return content.slice(0, content.indexOf(summaryHook))
}

exports.blog = blog
exports.blogTag = blogTag
exports.article = article
exports.tips = tips
exports.about = about
exports.banner = banner
exports.tag = tag
exports.validatePassword = validatePassword
