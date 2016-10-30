var sqlite3 = require('sqlite3').verbose()
var db;

exports.connect = function(callback) {
  callback = callback || () => {}

  db = new sqlite3.Database('hilshire.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    function(err) {
      if (err) {
        throw err
      } else
        callback()
    })
    
  return db
}

exports.disconnect = function() {
  db.close()
}

exports.blog = {
    add: createRunFn('INSERT INTO blog VALUES(?, ?, ?, ?, ?);'),
    del: createRunFn('DELETE FROM blog WHERE id = ?;'),
    update: createRunFn('UPDATE blog SET title = ?, content = ?, summary = ? WHERE id = ?;'),
    query: createGetFn('SELECT * FROM blog WHERE id = ?;'),
    queryList: createGetFn('SELECT id, title, summary, time From blog', 'all'),
    queryTags: createGetFn('SELECT rt.tag_id, tag.type FROM blog_tag rt INNER JOIN tag on tag.id = rt.tag_id and rt.blog_id = ?', 'all')
}

exports.article = {
    add: createRunFn('INSERT INTO article VALUES(?, ?, ?, ?);'),
    del: createRunFn('DELETE FROM article WHERE id = ?;'),
    update: createRunFn('UPDATE article SET title = ?, content = ? WHERE id = ?;'),
    query: createGetFn('SELECT * FROM article WHERE id = ?;'),
    queryList: createGetFn('SELECT id, title, content, time FROM article', 'all'),
    queryTags: createGetFn('SELECT rt.tag_id, tag.type FROM article_tag rt INNER JOIN tag on tag.id = rt.tag_id and rt.article_id = ?', 'all')
}

exports.tips = {
    add: createRunFn('INSERT INTO tips VALUES(?, ?, ?, ?);'),
    del: createRunFn('DELETE FROM tips WHERE id = ?'),
    update: createRunFn('UPDATE tips SET title = ?, content = ? WHERE id = ?'),
    query: createGetFn('SELECT * FROM tips WHERE id = ?'),
    queryList: createGetFn('SELECT id, title, content, time FROM tips', 'all'),
    queryTags: createGetFn('SELECT rt.tag_id, tag.type FROM tips_tag rt INNER JOIN tag on tag.id = rt.tag_id and rt.tip_id = ?', 'all')
}

exports.tag = {
    add: createRunFn('INSERT INTO tag VALUES(?, ?);'),
    del: createRunFn('DELETE FROM tag WHERE id = ?;'),
    update: createRunFn('UPDATE tag SET type = ? WHERE id = ?;'),
    query: createGetFn('SELECT * FROM tag WHERE id = ?;'),
    queryByType: createGetFn('SELECT * FROM tag WHERE type = ?'),
    queryList: createGetFn('SELECT * FROM tag', 'all'),
    queryRelation: createGetFn(
        'SELECT * FROM ' +
            '(SELECT blog_id FROM blog_tag WHERE tag_id = ?)' +
            'LEFT JOIN' +
            '(SELECT article_id FROM article_tag WHERE tag_id = ?)', 'all'
    )
}

exports.blogTag = {
  add: createRunFn('INSERT INTO blog_tag VALUES(?, ?);'),
  del: createRunFn('DELETE FROM blog_tag WHERE tag_id = ? AND blog_id = ?'),
  update: createRunFn('UPDATE blog_tag SET tag_id = ? WHERE blog_id = ?'),
  queryByRelation: createGetFn('SELECT tag_id FROM blog_tag WHERE blog_id = ?', 'all'),
  queryByTag: createGetFn('SELECT blog_id FROM blog_tag WHERE tag_id = ?', 'all'),
}

exports.articleTag = {
  add: createRunFn('INSERT INTO article_tag VALUES(?, ?);'),
  del: createRunFn('DELETE FROM article_tag WHERE tag_id = ? AND article_id = ?'),
  update: createRunFn('UPDATE article_tag SET tag_id WHERE article_id = ?'),
  queryByRelation: createGetFn('SELECT tag_id FROM article_tag WHERE article_id = ?', 'all'),
  queryByTag: createGetFn('SELECT article_id FROM article_tag WHERE tag_id = ?', 'all'),
}

exports.tipsTag = {
  add: createRunFn('INSERT INTO tips_tag VALUES(?, ?)'),
  del: createRunFn('DELETE FROM tips_tag WHERE tag_id = ? AND tips_id = ?'),
  update: createRunFn('UPDATE tips_tag SET tag_id WHERE tips_id = ?'),
  queryBytips: createGetFn('SELECT tag_id FROM tips_tag WHERE tips_id = ?', 'all'),
  queryByTag: createGetFn('SELECT tips_id FROM tips_tag WHERE tag_id = ?', 'all'),
}

exports.account = {
  add: createRunFn('INSERT INTO account VALUES(null, ?, ?, ?);'),
  del: createRunFn('DELETE FROM account WHERE id = ?;'),
  updatePassword: createRunFn('UPDATE account SET password = ? WHERE id = ?;'),
  updateType: createRunFn('UPDATE account SET type = ? WHERE id = ?'),
  queryByUsername: createGetFn('SELECT password FROM account WHERE username = ?;')
}

exports.about = {
    query: createGetFn('SELECT * from about'),
    update: createRunFn('UPDATE about SET content = ?')    
}

exports.banner = {
    add: createRunFn('INSERT INTO banner VALUES(?, ?)'),
    del: createRunFn('DELETE FROM banner WHERE id = ?'),
    update: createRunFn('UPDATE banner SET content = ? WHERE id = ?'),
    queryRandomRow: createGetFn('SELECT * FROM banner ORDER BY RANDOM() LIMIT 1'),
    queryList: createGetFn('SELECT * from banner', 'all')
}

// return a sqlite3 interface function
function createRunFn(sql, method) {
  return function(data, callback) {
    db[method || 'run'](sql, data, callback)
    console.log(sql, data)
  }
}


function createGetFn(sql, method) {
  return function(data, callback) {
    if(Object.prototype.toString.call(data) === '[object Function]') {
        callback = data
        data = undefined
    }
    db[method || 'get'](sql, data, callback)
    console.log(sql, data)
  }
}
