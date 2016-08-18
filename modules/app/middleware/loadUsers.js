var express = require('express');
var modelUsers = require('../models-postgre/users');

var params = {
  port: 8000,
  ip: '192.168.33.11'
};
modelUsers.connect("postgres://root:12345678@localhost:5432/blog", function (err) {
  if (err) throw err;
});

module.exports = function (req, res, next) {
  req.user = res.locals.user = null;
  if (!req.session.user) {
    return next();
  }
  modelUsers.findById(req.session.user, function (err, user) {
    if (err) {
      return next(err);
    } else {
      req.user = res.locals.user = user[0];
      next();
    }
  });
}
