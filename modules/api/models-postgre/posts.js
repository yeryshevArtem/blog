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

module.exports.create = function (title, body, createdAt, modifiedAt, callback) {
  client.query("insert into posts(title, body, created_at, modified_at) values($1, $2, $3, $4) returning id", [title, body, createdAt, modifiedAt]).then(function (id) {
    callback(null, id)
  }).catch(function (err) {
    callback(err);
  });
}

module.exports.update = function (key, title, body, modifiedAt, callback) {
  client.query("select * from posts where id=$1", [key]).then(function (data) {
    if (data.length !== 0) {
      client.query("update posts set title=$1, body=$2, modified_at=$3 where id=$4  returning id", [title, body, modifiedAt, key]).then(function (id) {
        callback(null, id);
      }).catch(function (err) {
        callback(err);
      });
    } else {
      throw err;
    }
  }).catch(function (err) {
    callback(err);
  });
}

module.exports.read = function (key, callback) {
  client.query("select * from posts where id=$1", [key]).then(function (data) {
    if (data.length !== 0) {
      callback(null, data);
    } else {
      throw err;
    }
  }).catch(function (err) {
    callback(err);
  });
}

module.exports.destroy = function (key, callback) {
  client.query("select * from posts where id=$1", [key]).then(function (data) {
    if (data.length !== 0) {
      client.query("delete from posts where id = $1", [key]).then(function () {
        callback(null);
      }).catch(function (err) {
        callback(err);
      });
    } else {
      throw err;
    }
  }).catch(function (err) {
    callback(err);
  });
}

//maybe it is not correctly, convert date in api module

module.exports.titles = function (callback) {
  var titles = [];
  client.any("select id, title, body, created_at, modified_at from posts").then(function (data) {
    data.forEach(function(row) {
      titles.push({id: row.id, title: row.title, body: row.body, createdAt: row.created_at, modifiedAt:row.modified_at});
    });
  }).catch(function (err) {
    callback(err);
  }).then(function () {
    callback(null, titles);
  });
}
