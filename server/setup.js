var fs = require('fs'),
    path = require('path')
var model = require('./model')
// var Q = require('q')

var db = model.connect(),
    file = path.resolve(__dirname, 'schema.sql')

// var initSqlPromise = (function() {
//     var defer = Q.defer()
//
//     fs.readFile("schema.sql", "utf-8", (error, sqls) => {
//         if (error) defer.reject(new Error(err))
//             else defer.resolve(sqls)
//     })
//
//     return () => defer.promise
// })()
//
// initSqlPromise()
//     .then(sqls => {
//         db.exec(sqls, err => {console.log(err)})
//     }, err => {
//         console.log(err)
//     }).done()

fs.readFile(file, "utf-8", (err, sqls) => {
    if (err) console.log(err)
    db.exec(sqls, err => {if (err) console.log(err)})
})

