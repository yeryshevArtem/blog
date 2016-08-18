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

module.exports.create = function (username, email, saltPassword, hashedPassword, role, createdAt, modifiedAt, callback) {
  client.query("insert into users(username, email, salt_password, hashed_password, role, created_at, modified_at) values($1, $2, $3, $4, $5, $6, $7) returning username, id, role", [username, email, saltPassword, hashedPassword, role, createdAt, modifiedAt]).then(function (data) {
    callback(null, data);
  }).catch(function (err) {
    callback(err);
  });
}

module.exports.read = function (username, callback) {
  client.query("select * from users where username=$1", [username]).then(function (data) {
    callback(null, data);
  }).catch(function (err) {
    callback(err);
  });
}

module.exports.findById = function (id, callback) {
  client.query("select * from users where id=$1", [id]).then(function (data) {
    callback(null, data);
  }).catch(function (err) {
    callback(err);
  });
}
