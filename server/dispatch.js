var hildb = require('./model.js')

exports.validatePassword = function(username, password, ep) {
    hildb.account.queryByUsername(username, function(err, row) {
        delErr(err)

        var result;
        if (!row) result = {isValidated: false, msg: 'No such user'}
            else if (row.password !== password) result = {isValidated: false, msg: 'Password error'} 
                else result = {isValidated: true, msg: 'success'}
        ep.emit('validate', result)
    }) 

    
    
}

function delErr(err) {
    if(err) console.log(err)
}

