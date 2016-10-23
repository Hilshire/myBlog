/*
 * service层。基础的service只是简单的传递给相应的dispatch，
 * 较为复杂的则会操纵其它的dispatch。
 */

'use strict'

var dispatch = require('./dispatch'),
    EventProxy = require('eventproxy'),
    Q = require('q')

var tagDP = dispatch.tag

function Server(dispatch) {
    this.dispatch = dispatch
}
Server.prototype = {
    add(data, ep) {
       handleResult(ep, data, this.dispatch.add.bind(this.dispatch))
    },
    update(data, ep) {
        handleResult(ep, data, this.dispatch.update.bind(this.dispatch))
    },
    del(data, ep) {
        handleResult(ep, data, this.dispatch.del.bind(this.dispatch))
    },
    queryById(data, ep) {
        handleResult(ep, data, this.dispatch.queryById.bind(this.dispatch))
    },
    queryList(ep) {
        handleResult(ep, this.dispatch.queryList.bind(this.dispatch))
    }
}

function ServerTag(mainDP, tagRelationDP) {
    this.dispatch = mainDP
    this.tagRelationDP = tagRelationDP
}
ServerTag.prototype = Object.create(Server.prototype)
ServerTag.prototype.addTag = function(data, ep) {
        var defer = Q.defer()
        var tag = data.text,
            relationId = data.relationId
        tagDP.queryByType(defer, data)
        defer.promise.then((oldTag) => {
            if(!oldTag) {
                return tagDP.add(data).then(() => {
                    return tagDP.queryByType(tag)
                })
            } else {
                return oldTag
            }
        })
        .then((tag) => {
            if(tag) return this.tagRelationDP.add(tag.id, relationId)
        })
        .done((result) => {
            ep.emit('success', result)
        }, (result) => {
            ep.emit('error', result)
        })
        //TODO: try to get id directly
        // if(!oldId) {
        //     tagDP.add(tag)
        //     var tagid = tagDP.queryByType(tag).id
        //     this.tagRelationDP.add(id, relationId)
        // } else {
        //     this.tagRelationDP.add(oldId, relationId)
        // }
}
ServerTag.prototype.delTag = function(data, ep) {
    var defer = Q.defer()
    var tag = data.tag,
        relationId = data.relationId,
        _tagId;
    tagDP.del(tag)
         .then(() => {
             return tagDP.queryByType(tag)
         })
         .then((tagId) => {
             if(tagId) tagRelationDP.del(tagId, relationId)
             _tagId = tagId
             return tagId
         })
         .then((tagId) => {
             return tagRelationDP.queryByTagId(tagId)
         })
         .then((releationId) => {
             if(!releationId) tagDp.del(_tagId)
         })
         .done((result) => {
             ep.emit('success', result)
         }, (result) => {
             ep.emit('Error', result)
         })
}

var blog = new ServerTag(dispatch.blog, dispatch.blogTag),
    article = new ServerTag(dispatch.article, dispatch.articleTag),
    tips = new ServerTag(dispatch.tips, dispatch.tipsTag),
    banner = new Server(dispatch.banner),
    tag = new Server(dispatch.tag),
    validatePassword = dispatch.validatePassword,
    about = {
        query(ep) {
            handleResult(ep, dispatch.about.query.bind(dispatch.about))
        },
        update(data, ep) {
            handleResult(data, ep, dispatch.about.update.bind(dispatch.about))
        }
    }

banner.query = function (ep) {
    handleResult(ep, dispatch.banner.query.bind(dispatch.banner))
}

exports.blog = blog
exports.article = article
exports.tips = tips
exports.about = about
exports.banner = banner
exports.validatePassword = validatePassword

function handleResult(ep, data, handler) {
    if(Object.prototype.toString.call(data) === '[object Function]') {
        handler = data
        data = ''
    }
    var defer = Q.defer()

    handler(defer, data)

    defer.promise.then((result) => {
        ep.emit('success', result)
    }, (result) => {
        ep.emit('Error', result.msg)
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
