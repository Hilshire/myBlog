/* 
 * service层。基础的service只是简单的传递给相应的dispatch，
 * 较为复杂的则会操纵其它的dispatch。
 */

'use strict'

var dispatch = require('./dispatch'),
    EventProxy = require('eventProxy'),
    Q = require('q')

var tagDP = dispatch.tag

function Server(dispatch) {
    this.dispatch = dispatch
}
Server.prototype = {
    add(data, ep) {
        var result = this.dispatch.add(data, ep)
        handleResult(result, ep)
    },
    update(data, ep) {
        var result = this.dispatch.update(data, ep)
        handleResult(result, ep)
    },
    del(data, ep) {
        var result = this.dispatch.del(data, ep)
        handleResult(result, ep)
    },
    queryById(data, ep) {
        var result = this.dispatch.queryById(data, ep)
        handleResult(result, ep)
    },
    queryList(ep) {
        var result = this.dispatch.queryList()
        handleResult(result, ep)
    }
}

function ServerTag(mainDP, tagRelationDP) {
    this.dispatch = mainDP
    this.tagDP = tagRelationDP
}
ServerTag.prototype = Object.create(Server.prototype)
ServerTag.prototype.addTag = function(data, ep) {
        var defer = Q.defer()
        var tag = data.tag,
            relationId = data.id
        var oldId = tagDP.queryByType(tag).id
        //TODO: try to get id directly
        // if(!oldId) {
        //     tagDP.add(tag)
        //     var tagid = tagDP.queryByType(tag).id
        //     this.tagRelationDP.add(id, relationId)
        // } else {
        //     this.tagRelationDP.add(oldId, relationId)
        // }
}

var blog = new ServerTag(dispatch.blog, dispatch.blogTag),
    article = new ServerTag(dispatch.article, dispatch.articleTag),
    tips = new ServerTag(dispatch.tips, dispatch.tipsTag),
    banner = new Server(dispatch.banner),
    tag = new Server(dispatch.tag),
    validatePassword = dispatch.validatePassword,
    about = {
        query(ep) {
            var result = dispatch.about.query(ep)
            handleResult(result, ep)
        },
        update(data, ep) {
            var result = dispatch.about.update(data, ep)
            handleResult(result, ep)
        }
    }

banner.query = function (ep) {
    var result = dispatch.banner.query()
    handleResult(result, ep)
}
    
exports.blog = blog
exports.article = article
exports.tips = tips
exports.about = about
exports.banner = banner
exports.validatePassword = validatePassword

function handleResult(result, ep) {
    if(result.error) ep.emit('Error', result)
        else ep.emit('success', result)
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
