import * as path from './const'

let jsonHeader = new Headers()
jsonHeader.append('Content-Type', 'application/json;charset:utf-8')

let jsonInit = {
    method: 'POST',
    headers: jsonHeader
}

let jsonAjax = (url, data, callback) => {
    jsonInit.body = JSON.stringify(data)
    fetch(url, jsonInit).then((res) => {
        if (res.ok) {
            res.json().then(callback(json))
        }
    })
    // $.ajax({
    //     url: url,
    //     method: 'post',
    //     data: JSON.stringify(data),
    //     contentType: 'application/json',
    //     sucess: function (data) {
    //         callback(data)
    //     }
    // })
}
export function login(username, password) {
    jsonAjax(path.LOGIN, {username:username, password:password}, (json) => {
        alert(json)
    })
}