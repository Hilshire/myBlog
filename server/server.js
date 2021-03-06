/*
 * service层。基础的service只是简单的传递给相应的dispatch，
 * 较为复杂的则会操纵其它的dispatch。
 * 用eventproxy与control交互，用promise与dispatch交互
 */

'use strict'

var dispatch = require('./dispatch'),
    config = require('../config.js'),
    Q = require('q')

var tagDP = dispatch.tag

// 定义类
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
        handleResult(ep, data, this.dispatch.queryList.bind(this.dispatch))
    }
}

function ServerTag(mainDP, tagRelatedDP) {
    this.dispatch = mainDP
    this.tagRelatedDP = tagRelatedDP
}
ServerTag.prototype = Object.create(Server.prototype)
ServerTag.prototype.queryList = function(data, ep) {
    let page = parseInt(data.page),
        pageSize = config.pageSize
    let limit = [(page - 1) * pageSize, pageSize]

    Q.all([
        this.dispatch.queryList(limit),
        this.dispatch.queryListCount()
    ])
    .spread(function(list, count) {
        let total = Math.ceil(count.val/pageSize)
        return {list: list, total: total, current: page}
    })
    .done(
        result => ep.emit('success', result),
        error => ep.emit('Error', error)
    )
}
ServerTag.prototype.queryById = function (data, ep) {
    var id = data.id

    Q.all([
        this.dispatch.queryById(data),
        this.dispatch.queryTags(id),
        tagDP.queryList()
    ])
    .spread(function(mainArr, tagArr, allTagArr) {
        return {main: mainArr, tags: tagArr, allTags: allTagArr}
    })
    .done(
        result => ep.emit('success', result),
        error => ep.emit('Error', error)
    )
}
ServerTag.prototype.queryAllTags = function (data, ep) {
    var relatedId = data.relatedId,
        tagRelatedDP = this.tagRelatedDP
    tagRelatedDP
        .queryByRelated(relatedId)
        .done(
            result => ep.emit('success', result),
            error => ep.emit('Error', error)
        )
}
ServerTag.prototype.addTag = function(data, ep) {
    var tag = data.text,
        relatedId = data.relatedId
    tagDP
    .queryByType(data)
    .then(oldTag => {
        if(!oldTag) {
            return tagDP
                .add(data)
                .then(() => tagDP.queryByType(data))
        } else {
            return oldTag
        }
    })
    .then(tag => {
        if (tag) return this.tagRelatedDP.add(relatedId, tag.id)
    })
    .done(result => {
        ep.emit('success', {success: 1})
    }, (error) => {
        throw error
        ep.emit('Error', error)
    })
}
ServerTag.prototype.delTag = function(data, ep) {
    var tagId = data.tagId,
        relatedId = data.relatedId,
        tagRelatedDP = this.tagRelatedDP

    tagRelatedDP
        .del(tagId, relatedId)
        .then(() => {
            return tagDP.queryRelation(tagId)
        })
        .then(tagArr => {
            if (tagArr.length === 0) tagDP.del({id: tagId})
        })
        .done((result) => {
            ep.emit('success', {success: 1})
        }, (result) => {
            ep.emit('Error', result)
        })
}

// 生成对象
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
            handleResult(ep, data, dispatch.about.update.bind(dispatch.about))
        }
    }

// 定制

tag.queryContentByTag = function(data, ep) {
    var id = data.id

    Q.all([
        dispatch.blog.queryListByTag(id),
        dispatch.article.queryListByTag(id),
        dispatch.tips.queryListByTag(id)
    ])
    .spread(function(blogArr, articleArr, tipsArr) {
        var result = {}
        blogArr.forEach(blog => {
            var time = blog.time,
                timeArr = result[time] = []

            timeArr.push({type:'blog', id:blog.id, title:blog.title, summary:blog.summary})
        })
        articleArr.forEach(article => {
            var time = article.time
            if(!result[time]) result[time] = []
            result[time].push({type:'article', id:article.id, title:article.title})
        })
        tipsArr.forEach(tip => {
            var time = tip.time
            if(!result[time]) result[time] = []
            result[time].push({type:'tip', id:tip.id, title:tip.title, content:tip.content})
        })

        return result
    })
    .done(
        result => ep.emit('success', result),
        error => ep.emit('Error', error)
    )
}

banner.query = function (ep) {
    handleResult(ep, dispatch.banner.query.bind(dispatch.banner))
}
// 增加queryList方法
banner.queryList = ServerTag.prototype.queryList

// 导出
exports.blog = blog
exports.article = article
exports.tips = tips
exports.about = about
exports.banner = banner
exports.tag = tag
exports.validatePassword = validatePassword

// 辅助函数
function handleResult(ep, data, handler) {
    if(Object.prototype.toString.call(data) === '[object Function]') {
        handler = data
        data = ''
    }

    handler(data)
    .then(
        result => {
            ep.emit('success', result)
        },
        error => {
            console.log('dispatch error ', error)
            ep.emit('Error', error)
        }
    )
    .done()
}
