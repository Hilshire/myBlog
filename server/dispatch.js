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
                handleData(err, {success: 1, msg: 'Add Success'}, resolve)
            })
        }.bind(this))
    },
    del(data) {
        //TODO：如果id不存在也会显示成功
        return Q.Promise(function (resolve) {
            this.model.del(data.id, err => {
                handleData(err, {success: 1, msg: 'Del Success'}, resolve)
            })
        }.bind(this))
    },
    update(data) {
        return Q.Promise(function (resolve) {
            this.model.update(data, err => {
                handleData(err, {success: 1, msg: 'Update Success'}, resolve)
            })
        }.bind(this))
    },
    queryList(data) {
        return Q.Promise(function (resolve) {
            this.model.queryList((err, row) => {
                handleData(err, row, resolve)
            })
        }.bind(this))
    },
    queryById(data) {
        return Q.Promise(function (resolve) {
            this.model.query(data.id, (err, row) => {
                handleData(err, row, resolve)
            })
        }.bind(this))
    },
    queryTags(id) {
        if (!this.model.queryTags) return
        return Q.promise(resolve => {
            this.model.queryTags(id, (err, row) => {
                handleData(err, row, resolve)
            })
        })
    },
}

function tagRelDP(model) {
    this.model = model
}
tagRelDP.prototype = {
    queryById(tagId) {
        return Q.promise(function (resolve) {
            this.model.queryByTag(tagId, (err, row) => {
                handleData(err, row, resolve)
            })
        }.bind(this))
    },
    queryByRelation(relatedId) {
        return Q.promise(function (resolve) {
           this.model.queryByRelation(relatedId, (err, row) => {
               handleData(err, row, resolve)
           })
        }.bind(this))
    },
    del(tagId, relatedId) {
        return Q.promise(function (resolve) {
           this.model.del([tagId, relatedId], (err, row) => {
               handleData(err, {success: 1, msg: 'Tag Deleted'}, resolve)
           })
        }.bind(this))
    },
    add(tagId, relatedId) {
        return Q.promise(function (resolve) {
            this.model.add([tagId, relatedId], (err, row) => {
                handleData(err, {success: 1, msg: 'Tag Added'}, resolve)
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
            handleData(err, {success: 1, msg: 'Add Success'}, resolve)
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
            handleData(err, {success: 1, msg: 'Update Success'}, resolve)
        })
    }.bind(this))
}

var article = new Dispatch(hildb.article)
article.add = function(data) {
    var data = [data.id?data.id:null, data.title, data.content, moment().format('l')]
    return Q.Promise(function (resolve) {
        this.model.add(data, err => {
            handleData(err, {success: 1, msg: 'Add Success'}, resolve)
        })
    }.bind(this))
}
article.update = function(data) {
    var data = [data.title, data.content, data.id]
    return Q.Promise(function (resolve) {
        this.model.update(data, (err, row) => {
            handleData(err, {success: 1, msg: 'Update Success'}, resolve)
        })
    }.bind(this))
}

var tips = new Dispatch(hildb.tips)
tips.add = function(data) {
    var data = [data.id?data.id:null ,data.title, data.content, moment().format('l')]
    return Q.Promise(function (resolve) {
        this.model.add(data, err => {
            handleData(err, {success: 1, msg: 'Add Success'}, resolve)
        })
    }.bind(this))
}
tips.update = function(data) {
    var data = [data.title, data.content, data.id]
    return Q.Promise(function (resolve) {
        this.model.update(data, (err, row) => {
            handleData(err, {success: 1, msg: 'Update Success'}, resolve)
        })
    }.bind(this))
}

var about = {
    query() {
        return Q.Promise(function (resolve) {
            hildb.about.query((err, row) => {
                handleData(err, row, resolve)
            })
        }.bind(this))
    },
    update(data) {
        return Q.Promise(function (resolve) {
            hildb.about.update(data.content, (err, row) => {
                handleData(err, {success: 1, msg: 'Update Success'}, resolve)
            })
        }.bind(this))
    }
}

var banner = new Dispatch(hildb.banner)
banner.query = function(data) {
    var model = this.model

    return Q.Promise(function (resolve) {
        model.queryRandomRow((err, row) => {
            handleData(err, row, resolve)
        })
    }.bind(this))
}
banner.add = function(data) {
    var model = this.model,
        content = data.content,
        id = data.id?data.id:null

    return Q.Promise(function (resolve) {
        model.add([id, content], (err, row) => {
            handleData(err, {success:1, msg: 'Add Success'}, resolve)
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
            handleData(err, {success: 1, msg: 'Update Success'}, resolve)
        })
    }.bind(this))
}

var tag = new Dispatch(hildb.tag)
tag.add = function(data) {
    var model = this.model,
        type = data.text,
        tagId = data.tagId?data.tagId:null
    var data = [tagId, type]
    return Q.Promise(function (resolve) {
        model.add(data, (err, row) => {
            handleData(err, {success: 1, msg:' Add Success'}, resolve)
        })
    }.bind(this))
}
tag.queryByType = function(data) {
    var model = this.model,
        type = data.text
    return Q.Promise(function (resolve) {
        model.queryByType(type, (err, row) => {
            handleData(err, row, resolve)
        })
    }.bind(this))
}

var blogTag = new tagRelDP(hildb.blogTag)
// blogTag.add = function (tagId, relatedId) {
//     var model = this.model,
//         data = [tagId, relatedId]
//     return Q.Promise(function (resolve) {
//         model.add(data, (err, row) => {
//             handleData(err, {success: 1, msg: 'Tag Add Success'}, resolve)
//         })
//     }.bind(this))
//
// }
// blogTag.queryByTagId = function (tagId) {
//     var model = this.model
//     return Q.Promise(function (resolve) {
//         model.queryByTagId(tagId, (err, row) => {
//             handleData(err, row, resolve)
//         })
//     }.bind(this))
// }
// blogTag.del = function (tagId, relatedId) {
//     var model = this.model,
//         data = [tagId, relatedId]
//     return Q.promise(function (resolve) {
//         model.del(data, (err, row) => {
//             handleData(err, row, resolve)
//         })
//     })
// }

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
function handleData(err, data, resolve, callback) {
    if(err) {
        throw err
    } else {
        console.log('dispatch return data: ', data)
        if (callback) data = callback(data)
        resolve(data)
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
