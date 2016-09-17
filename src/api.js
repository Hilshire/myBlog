import * as path from './const'

let jsonHeader = new Headers()
jsonHeader.append('Content-Type', 'application/json')

let jsonInit = {
    method: 'POST',
    headers: jsonHeader
}

let jsonAjax = (url, data, callback) => {
    if (Object.prototype.toString.call(data) === '[object Function]') {
        callback = data
        data = undefined
    }
    jsonInit.body = JSON.stringify(data)
    fetch(url, jsonInit).then(res => {
        if (res.ok) {
            res.json().then(function(data) {
                callback(data)
            })
        } else {
            Materialize.toast('fail')
        }
    })
}


export function login(username, password) {
    jsonAjax(path.LOGIN, {username:username, password:password}, data => {
        if(!data.isCorrect) Materialize.toast(data.msg, 2000)
            else window.location.href = path.MANAGER
    })
}

export let blog = {
    queryList(target) {
        jsonAjax(path.QUERY_BLOG_LIST, json => {
            console.log(target)
            console.log(json)
            target.table = json
        })
    },
    add(data) {
        jsonAjax(path.ADD_BLOG, data, json => {
            Materialize.toast(json, 2000)
        })
    },
    updateBlog(data) {
        jsonAjax(path.UPDATE_BLOG, data, json => {
            Materialize.toast(josn, 2000)
        })
    }
}
