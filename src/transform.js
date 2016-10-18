import * as api from './fetch'
import * as url from './const'
import EventProxy from 'eventproxy'

let toastTime = 2000,
    infoToastTime = 6000

class Query {
    constructor(option) {
        this.ep = new EventProxy()
        this.url = {}

        for(var value in option) {
            this.url[value] = option[value]
        }
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

class Transform extends Query {
    constructor(option) {
        super(option)
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
}

export let manager = {
    blog: new Transform({
        add: url.blog.ADD,
        update: url.blog.UPDATE,
        del: url.blog.DEL,
        queryList: url.blog.QUERY_LIST,
        queryById: url.blog.QUERY_BY_ID
    }),

    article: new Transform({
        add: url.article.ADD,
        update: url.article.UPDATE,
        del: url.article.DEL,
        queryList: url.article.QUERY_LIST,
        queryById: url.article.QUERY_BY_ID
    }),
    
    tips: new Transform({
        add: url.tips.ADD,
        update: url.tips.UPDATE,
        del: url.tips.DEL,
        queryList: url.tips.QUERY_LIST,
        queryById: url.tips.QUERY_BY_ID
    })
}

export let app = {
    blog: new Query({
        queryList: url.app.QUERY_BLOG_LIST,
        queryById: url.app.QUERY_BLOG
    }),
    article: new Query({
        queryList: url.app.QUERY_ARTICLE_LIST,
        queryById: url.app.QUERY_ARTICLE
    }),
    tips: new Query({
        queryList: url.app.QUERY_TIPS_LIST,
        queryById: url.app.QUERY_TIPS
    })
}

export function login(username, password) {
    api.jsonAjax(url.base.LOGIN, {username:username, password:password}, data => {
        if(!data.passValidate) Materialize.toast(data.msg, toastTime)
            else window.location.href = url.blog.ROOT
    })
}
