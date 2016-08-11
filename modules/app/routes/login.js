var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user').User;
// var path = require('path');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

var users = undefined;
module.exports = router;
module.exports.configure = function (params) {
  users = params.model;
}

router.get('/login', function (req, res, next) {
    res.render('login', {
      title: 'Welcome',
      user: res.locals.user
    });
  });

router.post('/login', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  User.authorize(username, password, email, users, function (err, user) {
    if (err) {
      if (err instanceof AuthError) {
        return next(new HttpError(403, err.message));
      } else {
        return next(err);
      }
    }
    req.session.user = user[0].id
    res.statusCode = 200;
    res.end(JSON.stringify(user[0]));
  });
});
