var db = require('./model')

var hildb = db.connect(function() {

})
hildb.connect()
console.log(hildb)
console.log(hildb.__proto__)
hildb.run('INSERT INTO tag VALUES(null, ?)', "test", function(err, row) {
    console.log('row', row)
})
