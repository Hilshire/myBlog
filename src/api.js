import * as path from './const'

let jsonInit = {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    credentials: 'include'
}

//TODO: 异常捕获
let jsonAjax = (url, data, callback) => {
    if (Object.prototype.toString.call(data) === '[object Function]') {
        callback = data
        data = undefined
    }
    jsonInit.body = JSON.stringify(data)
    fetch(url, jsonInit).then(res => {
        if (res.ok) {
            res.json().then(function(data) {
                if(data.error) {
                    Materialize.toast(data.msg)
                    if(data.error == 1) window.location.href = path.base.LOGIN
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
    jsonAjax(path.base.LOGIN, {username:username, password:password}, data => {
        if(!data.passValidate) Materialize.toast(data.msg, 2000)
            else window.location.href = path.base.MANAGER
    })
}

export let blog = {
    add(data) {
        jsonAjax(path.blog.ADD, data, json => {
            Materialize.toast(json.msg, 2000)
        })
    },
    del(id) {
        jsonAjax(path.blog.DEL, id, result => {
            Materialize.toast(result.msg, 2000)
        })
    },
    update(data) {
        jsonAjax(path.blog.UPDATE, data, json => {
            Materialize.toast(json.msg, 2000)
        })
    },
    queryList(vm) {
        jsonAjax(path.blog.QUERY_LIST, json => {
            vm.table = json
        })
    },
    //这里传入vm，导致视图和逻辑耦合。
    //为零应对ajax异步不得已而为之
    //不知道有没有什么更好的方法
    //TODO: fix it
    queryById(id, vm) {
        jsonAjax(path.blog.QUERY_BY_ID, id, json => {
            vm.title = json.title
            vm.text = json.text
            vm.$nextTick(() => {
                Materialize.updateTextFields()
            })
        })
    }
}
