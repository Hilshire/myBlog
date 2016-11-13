'use strict'
import * as urlConst from './const'
import 'whatwg-fetch'

let jsonInit = {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    credentials: 'include'
}

//TODO: 异常捕获
export let post = (url, data, callback) => {
    if (Object.prototype.toString.call(data) === '[object Function]') {
        callback = data
        data = undefined
    }
    jsonInit.body = JSON.stringify(data)
    fetch(url, jsonInit).then(res => {
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
        if(data.error == 1) window.location.href = urlConst.base.LOGIN
    }
}

export let get = (url, data, callback) => {
    if (Object.prototype.toString.call(data) === '[object Function]') {
        callback = data
        data = undefined
    }

    if(data) {
        url += '?' + Object.keys(data).filter(
                key => data[key] && key
            ).map(
                key => key + '=' + data[key]
            ).join("&")
    }

    fetch(url, {method: 'GET'}).then(response => response.json())
        .catch(err => console.error(err))
        .then(json => {callback(json)})
        .catch(err => console.error(err))
}
