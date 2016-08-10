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

module.exports.create = function (username, email, saltPassword, hashedPassword, createdAt, modifiedAt, callback) {
  client.query("insert into users(username, email, salt_password, hashed_password, created_at, modified_at) values($1, $2, $3, $4, $5, $6) returning id", [username, email, saltPassword, hashedPassword, createdAt, modifiedAt]).then(function (id) {
    callback(null, id)
  }).catch(function (err) {
    callback(err);
  });
}

module.exports.read = function (username, callback) {
  client.query("select * from users where username=$1", [username]).then(function (data) {
    if (data.length !== 0) {
      callback(null, data);
    } else {
      throw err;
    }
  }).catch(function (err) {
    callback(err);
  });
}
