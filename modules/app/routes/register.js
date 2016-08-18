var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

var users = undefined;
module.exports = router;
module.exports.configure = function (params) {
  users = params.model;
}

router.get('/register', function (req, res, next) {
  res.render('register', {
    title: "Sign Up"
  });
});

router.post('/register', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  User.register(username, password, email, users, function (err, user) {
    if (err) {
      if (err instanceof HttpError) {
        return next(new HttpError(409, err.message));
      } else {
        return next(err);
      }
    }
    req.session.role = user[0].role;
    req.session.user = user[0].id;
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(user[0]));
  });
});
