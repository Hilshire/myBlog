import * as url from './const'

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
            res.json().then(function(data) {
                if(data.error) {
                    Materialize.toast(data.msg)
                    if(data.error == 1) window.location.href = url.base.LOGIN
                    return
                }

                callback(data)
            })
        } else {
            Materialize.toast('fail')
        }
    }).catch(err => {console.log(err)})
}


export function login(username, password) {
    jsonAjax(url.base.LOGIN, {username:username, password:password}, data => {
        if(!data.passValidate) Materialize.toast(data.msg, 2000)
            else window.location.href = url.blog.ROOT
    })
}

export let blog = {
    add(router, data) {
        jsonAjax(url.blog.ADD, data, json => {
            Materialize.toast(json.msg, 2000)
            if(json.success) router.go(url.blog.VUE_ROOT)
        })
    },
    del(id) {
        jsonAjax(url.blog.DEL, id, result => {
            Materialize.toast(result.msg, 2000)
        })
    },
    update(router, data) {
        jsonAjax(url.blog.UPDATE, data, json => {
            Materialize.toast(json.msg, 2000)
            if(json.success) router.go(url.blog.VUE_ROOT)
        })
    },
    queryList(vm) {
        jsonAjax(url.blog.QUERY_LIST, json => {
            vm.table = json
        })
    },
    //这里传入vm，导致视图和逻辑耦合。
    //为零应对ajax异步不得已而为之
    //不知道有没有什么更好的方法
    //TODO: fix it
    queryById(id, vm) {
        jsonAjax(url.blog.QUERY_BY_ID, id, json => {
            vm.title = json.title
            vm.text = json.text
            vm.$nextTick(() => {
                Materialize.updateTextFields()
            })
        })
    }
}

export let project = {
    add(router, data) {
        jsonAjax(url.project.ADD, data, json => {
            Materialize.toast(json.msg, 2000)
            if(json.success) router.go(url.project.VUE_ROOT)
        })
    },
    del(id) {
        jsonAjax(url.project.DEL, id, result => {
            Materialize.toast(result.msg, 2000)
        })
    },
    update(router, data) {
        jsonAjax(url.project.UPDATE, data, json => {
            Materialize.toast(json.msg, 2000)
            if(json.success) router.go(url.project.VUE_ROOT)
        })
    },
    queryList(vm) {
        jsonAjax(url.project.QUERY_LIST, json => {
            vm.table = json
        })
    },
    queryById(id, vm) {
        jsonAjax(url.project.QUERY_BY_ID, id, json => {
            vm.title = json.title
            vm.describe = json.describe
            vm.address = json.address
            vm.$nextTick(() => {
                Materialize.updateTextFields()
            })
        })
    }
}
