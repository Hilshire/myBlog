var hildb = require('./model.js')
var moment = require('moment')

var summaryHook = '<!--summary-->'
moment.locale('zh-cn')

function Dispatch(model) {
    this.model = model
}
Dispatch.prototype = {
    add(data, ep) {
        this.model.add(data, err => {
            handleData(err, ep, {success: 1, msg: 'Add Success'})
        })
    },
    del(data, ep) {
        //TODO：如果id不存在也会显示成功
        this.model.del(data.id, err => {
            handleData(err, ep, {success: 1, msg: 'Del Success'})
        })
    },
    update(data, ep) {
        this.model.update(data, err => {
            handleData(err, ep, {success: 1, msg: 'Update Success'})
        })
    },
    queryList(ep) {
        this.model.queryList((err, row) => {
            handleData(err, ep, row)
        })
    },
    queryById(data, ep) {
        this.model.query(data.id, (err, row) => {
            handleData(err, ep, row)
        })
    }
}

var blog = new Dispatch(hildb.blog)
blog.add = function (data, ep) {
    var title = data.title,
        content = data.content,
        summary = getSummary(content),
        model = this.model

    var data = [title, content, summary, moment().format('l')]
    model.add(data, err => {
        handleData(err, ep, {success: 1, msg: 'Add Success'})
    })
}
blog.update = function (data, ep) {
    var title = data.title,
        content = data.content,
        summary = getSummary(content),
        model = this.model

    model.update([title, content, summary, data.id], err => {
        handleData(err, ep, {success: 1, msg: 'Update Success'})
    })
}

var article = new Dispatch(hildb.article)
article.add = function(data, ep) {
    var data = [data.title, data.content, moment().format('l')]
    this.model.add(data, err => {
        handleData(err, ep, {success: 1, msg: 'Add Success'})
    })
}
article.update = function(data,ep) {
    var data = [data.title, data.content, data.id]
    this.model.update(data, (err, row) => {
        handleData(err, ep, {success: 1, msg: 'Update Success'})
    })
}

var tips = new Dispatch(hildb.tips)
tips.add = function(data, ep) {
    var data = [data.title, data.content, moment().format('l')]
    this.model.add(data, err => {
        handleData(err, ep, {success: 1, msg: 'Add Success'})
    })
}
tips.update = function(data, ep) {
    var data = [data.title, data.content, data.id]
    this.model.update(data, (err, row) => {
        handleData(err, ep, {success: 1, msg: 'Update Success'})
    })
}

var about = {
    query(ep) {
        hildb.about.query((err, row) => {
            handleData(err, ep, row)
        })
    },
    update(data, ep) {
        hildb.about.update(data.content, (err, row) => {
            handleData(err, ep, {success: 1, msg: 'Update Success'})
        })
    }
}

var banner = new Dispatch(hildb.banner)
banner.queryById = ep => {
    var model = this.model,
        len = this.model.getLength(),
        id = Math.round(Math.random() * len)
    model.queryById(data, (err, row) => {
        handleData(err, ep, row) 
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

// exports.blog = {
//     add(data, ep) {
//         var title = data.title,
//             content = data.content,
//             summary = getSummary(content)
//         var data = [title, content, summary, moment().format('l')]
//         hildb.blog.add(data, err => {
//             handleData(err, ep, {success: 1, msg: 'Add Success'})
//         })
//     },
//     del(data, ep) {
//         hildb.blog.del(data.id, err => {
//             handleData(err, ep, {success: 1, msg: 'Del Success'})
//         })
//     },
//     update(data, ep) {
//         var title = data.title,
//             content = data.content,
//             summary = getSummary(content)
//         hildb.blog.update([title, content, summary, data.id], err => {
//             handleData(err, ep, {success: 1, msg: 'Update Success'})
//         })
//     },
//     queryList(ep) {
//         hildb.blog.queryList((err, row) => {
//             handleData(err, ep, row)
//         })
//     },
//     queryById(data, ep) {
//         hildb.blog.query(data.id, (err, row) => {
//             handleData(err, ep, row)
//         })
//     },
//     addTag(data, ep) {
//         if(data.tagId) {
//             addExistTag(data)
//         } else {
//             //TODO:YOU SEE THE CALLBACK HELL
//             var tagExist;
//             hildb.tag.queryByText(data.text, (err, row) => {
//                 if(err) {
//                     ep.emit('Error', {msg: 'query blog tag by text error'})
//                 }
//
//                 tagExist = row
//
//                 if(tagExist) {
//                     addExistTag({blogId: data.blogId, tagId: tagExist.tagId})
//                 } else {
//                     var text = data.text,
//                         blogId = data.blogId
//
//                     hildb.tag.add([null, text], (err) => {
//                         if(err) {
//                             ep.emit('Error', {msg: 'add new tag error'})
//                         }
//
//                         var newTagId;
//
//                         hildb.tag.queryByText(text, (err, row) => {
//                             if(err) {
//                                 ep.emit('Error', {msg: 'query blog tag by text error'})
//                                 return
//                             }
//                             newTagId = row.id
//
//                             hildb.blogTag.add([blogId, newTagId], (err) => {
//                                 handleData(err, ep, {success: 1, msg: 'Add Success'})
//                             })
//                         })
//                     })
//                 }
//             })
//         }
//
//         function addExistTag(data) {
//             hildb.blogTag.add([data.blogId, data.tagId], err => {
//                 handleData(err, ep, {success: 1, msg: 'Add Success'})
//             })
//         }
//     },
//     delTag(data, ep) {
//         var blogId = data.blogId
//         hildb.blogTag.del([blogId, data.tagId], err => {
//             handleData(err, ep, {success: 1, msg: 'Del Success'})
//         })
//     }

// }

//善后: 处理错误，触发事件，回调处理数据。data是返回的数据
//最后一个参数可传一个boolean值，用于控制emit
function handleData(err, ep, data, callback) {
    var len = arguments.length,
        shouldEmit = true;
    if (typeof arguments[len] === 'Boolean')  shouldEmit = arguments[len]

    if(err) {
        console.log(err)
        ep.emit('Error', {msg: 'ERROR! ' + err})
    } else {
        if (callback) {
            console.log('db return data: ', data)
            data = callback(data)
        }
        if (shouldEmit) {
            ep.emit('success', data)
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
exports.article = article
exports.tips = tips
exports.about = about
exports.banner = banner
exports.validatePassword = validatePassword