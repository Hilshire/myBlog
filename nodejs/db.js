var sqlite3 = require('sqlite3').verbose()

exports.connect = function(callback) {
  callback = callback || () => {}
  db = new sqlite3.Database('schema.sql',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    function(err) {
      if (err) {
        utils.log('Fail on creating database' + err)
        callback(err)
      } else
        callback()
    })
}

exports.disconnect = function(callback) {
  db.close()
  callback()
}
