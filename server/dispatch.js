/*
 * 对model进行简单的处理。包含最基础的业务逻辑
 */

var hildb = require('./model.js')
var moment = require('moment')
var Q = require('q')

var summaryHook = '<!--summary-->'
moment.locale('zh-cn')

function Dispatch(model) {
    this.model = model
}
Dispatch.prototype = {
    add(data) {
        return Q.Promise(function (resolve) {
            this.model.add(data, err => {
                resolve(handleData(err, {success: 1, msg: 'Add Success'}))
            })
        }.bind(this))
    },
    del(data) {
        //TODO：如果id不存在也会显示成功
        return Q.Promise(function (resolve) {
            this.model.del(data.id, err => {
                resolve(handleData(err, {success: 1, msg: 'Del Success'}))
            })
        }.bind(this))
    },
    update(data) {
        return Q.Promise(function (resolve) {
            this.model.update(data, err => {
                resolve(handleData(err, {success: 1, msg: 'Update Success'}))
            })
        }.bind(this))
    },
    queryList(data) {
        return Q.Promise(function (resolve) {
            this.model.queryList((err, row) => {
                resolve(handleData(err, row))
            })
        }.bind(this))
    },
    queryById(data) {
        return Q.Promise(function (resolve) {
            this.model.query(data.id, (err, row) => {
                resolve(handleData(err, row))
            })
        }.bind(this))
    }
}

var blog = new Dispatch(hildb.blog)
blog.add = function (data) {
    var title = data.title,
        content = data.content,
        summary = getSummary(content),
        model = this.model,
        id = data.id?data.id:null

    var data = [id, title, content, summary, moment().format('l')]
    return Q.Promise(function (resolve) {
        model.add(data, err => {
            resolve(handleData(err, {success: 1, msg: 'Add Success'}))
        })
    }.bind(this))
}
blog.update = function (data) {
    var title = data.title,
        content = data.content,
        summary = getSummary(content),
        model = this.model

    return Q.Promise(function (resolve) {
        model.update([title, content, summary, data.id], err => {
            resolve(handleData(err, {success: 1, msg: 'Update Success'}))
        })
    }.bind(this))
}

var article = new Dispatch(hildb.article)
article.add = function(data) {
    var data = [data.id?data.id:null, data.title, data.content, moment().format('l')]
    return Q.Promise(function (resolve) {
        this.model.add(data, err => {
            resolve(handleData(err, {success: 1, msg: 'Add Success'}))
        })
    }.bind(this))
}
article.update = function(data) {
    var data = [data.title, data.content, data.id]
    return Q.Promise(function (resolve) {
        this.model.update(data, (err, row) => {
            resolve(handleData(err, {success: 1, msg: 'Update Success'}))
        })
    }.bind(this))
}

var tips = new Dispatch(hildb.tips)
tips.add = function(data) {
    var data = [data.id?data.id:null ,data.title, data.content, moment().format('l')]
    return Q.Promise(function (resolve) {
        this.model.add(data, err => {
            resolve(handleData(err, {success: 1, msg: 'Add Success'}))
        })
    }.bind(this))
}
tips.update = function(data) {
    var data = [data.title, data.content, data.id]
    return Q.Promise(function (resolve) {
        this.model.update(data, (err, row) => {
            resolve(handleData(err, {success: 1, msg: 'Update Success'}))
        })
    }.bind(this))
}

var about = {
    query() {
        return Q.Promise(function (resolve) {
            hildb.about.query((err, row) => {
                resolve(handleData(err, row))
            })
        }.bind(this))
    },
    update(data) {
        return Q.Promise(function (resolve) {
            hildb.about.update(data.content, (err, row) => {
                resolve(handleData(err, {success: 1, msg: 'Update Success'}))
            })
        }.bind(this))
    }
}

var banner = new Dispatch(hildb.banner)
banner.query = function(data) {
    var model = this.model

    return Q.Promise(function (resolve) {
        model.queryRandomRow((err, row) => {
            resolve(handleData(err, row))
        })
    }.bind(this))
}
banner.add = function(data) {
    var model = this.model,
        content = data.content,
        id = data.id?data.id:null

    return Q.Promise(function (resolve) {
        model.add([id, content], (err, row) => {
            resolve(handleData(err, {success:1, msg: 'Add Success'}))
        })
    }.bind(this))
}
banner.update = function(data) {
    var model = this.model,
        content = data.content,
        id = data.id
    var data = [content, id]
    return Q.Promise(function (resolve) {
        model.update(data, (err, row) => {
            resolve(handleData(err, {success: 1, msg: 'Update Success'}))
        })
    }.bind(this))
}

var tag = new Dispatch(hildb.tag)
tag.add = function(data) {
    var model = this.model,
        type = data.text,
        id = data.id?data.id:null
    var data = [id, type]
    return Q.Promise(function (resolve) {
        model.add(data, (err, row) => {
            resolve(handleData(err, {success: 1, msg:' Add Success'}))
        })
    }.bind(this))
}
tag.queryByType = function(data) {
    var model = this.model,
        type = data.text
    return Q.Promise(function (resolve) {
        model.queryByType(type, (err, row) => {
            resolve(handleData(err, row))
        })
    }.bind(this))
}

var blogTag = new Dispatch(hildb.blogTag)
blogTag.add = function (tagId, relationId) {
    var model = this.model,
        data = [tagId, relationId]
    return Q.Promise(function (resolve) {
        model.add(data, (err, row) => {
            resolve(handleData(err, null, {success: 1, msg: 'Tag Add Success'}))
        })
    }.bind(this))

}
blogTag.queryByTagId = function (tagId) {
    var model = this.model
    return Q.Promise(function (resolve) {
    model.queryByTagId(tagId, (err, row) => {
            resolve(handleData(err, null, row))
        })
    }.bind(this))
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
function handleData(err, data, callback) {
    if(err) {
        return {error:1, msg: 'ERROR! ' + err}
    } else {
        console.log('dispatch return data: ', data)
        if (callback) data = callback(data)
        return data
    }
}

function asyncDisPatch(fn) {
    return Q.promise(function (resolve, reject) {
        fn(resolve, reject)
    })
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
