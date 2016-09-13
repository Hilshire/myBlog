var hildb = require('./db.js')

hildb.connect()
db.serialize(function() {
    // hildb.tag.update(['test2', 1], function() {console.log('done')})
    hildb.tag.query([1], function(row) {console.log(row)})
})
hildb.disconnect()