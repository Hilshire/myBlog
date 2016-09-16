import * as path from './const'

let jsonHeader = new Headers()
jsonHeader.append('Content-Type', 'application/json')

let jsonInit = {
    method: 'POST',
    headers: jsonHeader
}

let jsonAjax = (url, data, callback) => {
    jsonInit.body = JSON.stringify(data)
    fetch(url, jsonInit).then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                if(!data.isCorrect) Materialize.toast(data.msg, 2000)
                    else window.location.href = path.MANAGER
            })
        }
    })
}
export function login(username, password) {
    jsonAjax(path.LOGIN, {username:username, password:password}, (json) => {
        alert(json)
    })
}