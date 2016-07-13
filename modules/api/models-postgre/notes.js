var pgp = require('pg-promise')();

var client = undefined;
module.exports.connect = function (dbStr, callback) {
  try {
    client = pgp(dbStr);
  } catch (err) {
    callback(err);
  }
}

module.exports.disconnect = function(callback) {
  callback();
}

module.exports.create = function (key, title, body, callback) {
  client.query("insert into notes(notekey, title, body) values($1, $2, $3)", [key, title, body]).then(function () {
    callback();
  }).catch(function (err) {
    callback(err);
  });
}

module.exports.update = function (key, title, body, callback) {
  client.none("update notes set title=$1, body=$2 where notekey=$3", [title, body, key]).then(function (data) {
    callback(null, data);
  }).catch(function (err) {
    callback(err);
  });
}

module.exports.read = function (key, callback) {
  client.query("select * from notes where notekey=$1", [key]).then(function (data) {
    callback(null, data);
  }).catch(function (err) {
    callback(err);
  });
}

module.exports.destroy = function (key, callback) {
  client.query("delete from notes where notekey = $1", [key]).then(function () {
    callback();
  }).catch(function (err) {
    callback(err);
  });
}

module.exports.titles = function (callback) {
  var titles = [];
  client.any("select notekey, title from notes").then(function (data) {
    data.forEach(function(row, index, data) {
      titles.push({key: row.notekey, title: row.title});
    });
  }).catch(function (err) {
    callback(err);
  }).then(function () {
    callback(null, titles);
  });
}
