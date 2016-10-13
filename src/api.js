'use strict'

import * as url from './const'

let toastTime = 2000,
    InfoToastTime = 6000

let jsonInit = {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    credentials: 'include'
}

//TODO: 异常捕获
let jsonAjax = (_url, data, callback) => {
    if (Object.prototype.toString.call(data) === '[object Function]') {
        callback = data
        data = undefined
    }
    jsonInit.body = JSON.stringify(data)
    fetch(_url, jsonInit).then(res => {
        if (res.ok) {
            res.json().then(data => {
                if(data.error) {
                    handleErrData(data)
                    return
                }

                callback(data)
            })
        } else {
           // handleErrData({msg: 'fetch Fail'})
            throw new Error('fetch Fail')
        }
    }).catch(err => {console.log(err)})

    function handleErrData(data) {
        if (window.Materialize) {Materialize.toast(data.msg)}
            else alert(data.msg)
        if(data.error == 1) window.location.href = url.base.LOGIN
    }
}

export let app = {
    blogList(ep) {
        jsonAjax(url.app.QUERY_BLOG_LIST, json => {
            ep.emit('blogList', json)
        })
    }
}


export function login(username, password) {
    jsonAjax(url.base.LOGIN, {username:username, password:password}, data => {
        if(!data.passValidate) Materialize.toast(data.msg, toastTime)
            else window.location.href = url.blog.ROOT
    })
}

export let blog = {
    add(router, data) {
        jsonAjax(url.blog.ADD, data, json => {
            Materialize.toast(json.msg, toastTime)
            if(json.success) router.go(url.blog.VUE_ROOT)
        })
    },
    del(id) {
        jsonAjax(url.blog.DEL, id, result => {
            Materialize.toast(result.msg, toastTime)
        })
    },
    update(router, data) {
        jsonAjax(url.blog.UPDATE, data, json => {
            Materialize.toast(json.msg, toastTime)
            if(json.success) router.go(url.blog.VUE_ROOT)
        })
    },
    queryList(ep) {
        jsonAjax(url.blog.QUERY_LIST, json => {
            // vm.table = json
            ep.emit('queryList', json)
        })
    },
    queryById(id, ep) {
        jsonAjax(url.blog.QUERY_BY_ID, id, json => {
            ep.emit('queryById', json)
            // vm.title = json.title
            // vm.text = json.text
            // vm.$nextTick(() => {
            //     Materialize.updateTextFields()
            // })
        })
    },
    tagInit(data, vm) {
        jsonAjax(url.blog.TAG_INIT, data, json => {
            vm.allTag = json.allTag
            vm.tags = json.tags
        })
    },
    addTag(data) {
        jsonAjax(url.blog.ADD_TAG, data)
    },
    delTag(data) {
        jsonAjax(url.blog.DEL_TAG, data)
    }
}

export let project = {
    add(router, data) {
        jsonAjax(url.project.ADD, data, json => {
            Materialize.toast(json.msg, toastTime)
            if(json.success) router.go(url.project.VUE_ROOT)
        })
    },
    del(id) {
        jsonAjax(url.project.DEL, id, result => {
            Materialize.toast(result.msg, toastTime)
        })
    },
    update(router, data) {
        jsonAjax(url.project.UPDATE, data, json => {
            Materialize.toast(json.msg, toastTime)
            if(json.success) router.go(url.project.VUE_ROOT)
        })
    },
    queryList(ep) {
        jsonAjax(url.project.QUERY_LIST, json => {
            ep.emit('queryList', json)
        })
    },
    queryById(id, ep) {
        jsonAjax(url.project.QUERY_BY_ID, id, json => {
            // vm.title = json.title
            // vm.describe = json.describe
            // vm.address = json.address
            // vm.$nextTick(() => {
            //     Materialize.updateTextFields()
            // })
            ep.emit('queryById', json)
        })
    }
}
