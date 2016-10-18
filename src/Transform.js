import * as api from './fetch'
import * as url from './const'
import EventProxy from 'eventproxy'

let toastTime = 2000,
    infoToastTime = 6000

class Transform {
    constructor(option) {
        this.ep = new EventProxy()
        this.url = {
            add : option.add,
            update : option.update,
            del : option.del,
            queryList : option.queryList,
            queryById : option.queryById
        }

        this.toastTime = toastTime
        this.InfoToastTime = infoToastTime
    }

    add(data) {
        api.jsonAjax(this.url.add, data, json => {
            Materialize.toast(json.msg, this.toastTime)
            if(json.success) this.ep.emit('add')
        })
    }

    del(id) {
        api.get(this.url.del, id, json => {
            Materialize.toast(json.msg, this.toastTime)
            if(json.success) this.ep.emit('del')
        })
    }

    update(data) {
        api.jsonAjax(this.url.update, data, json => {
            Materialize.toast(json.msg, this.toastTime)
            if(json.success) this.ep.emit('update')
        })
    }

    queryList() {
        api.get(this.url.queryList, json => {
            this.ep.emit('queryList', json)
        })
    }

    queryById(id) {
        api.get(this.url.queryById, id, json => {
            this.ep.emit('queryById', json)
        })
    }
}

export let blog = new Transform({
    add: url.blog.ADD,
    update: url.blog.UPDATE,
    del: url.blog.DEL,
    queryList: url.blog.QUERY_LIST,
    queryById: url.blog.QUERY_BY_ID
})

export let article = new Transform({
    add: url.article.ADD,
    update: url.article.UPDATE,
    del: url.article.DEL,
    queryList: url.article.QUERY_LIST,
    queryById: url.article.QUERY_BY_ID
})

export let app = {
    blogList(ep) {
        api.get(url.app.QUERY_BLOG_LIST, json => {
            ep.emit('blogList', json)
        })
    },
    queryBlog(id, ep) {
        api.get(url.app.QUERY_BLOG, id, json => {
            ep.emit('queryBlog', json)
        })
    },
    articleList(ep) {
        api.get(url.app.QUERY_ARTICLE_LIST, json => {
            ep.emit('aritcleList', json)
        })
    },
    queryArticle(id, ep) {
        api.get(url.app.QUERY_ARTICLE, id, json => {
            ep.emit('queryArticle', json)
        })
    }
}

export function login(username, password) {
    api.jsonAjax(url.base.LOGIN, {username:username, password:password}, data => {
        if(!data.passValidate) Materialize.toast(data.msg, toastTime)
            else window.location.href = url.blog.ROOT
    })
}
