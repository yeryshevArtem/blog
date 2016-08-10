var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var path = require('path');

var users = undefined;
module.exports = router;
module.exports.configure = function (params) {
  users = params.model;
}

router.get('/login', function (req, res) {
  res.render('login', {
    title: 'Welcome'
  });
});

router.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  users.read(username, function (err, user) {
    if (err) {

      //create user

      var user = new User(username, password, email);
      user.password = user.encryptPassword(user.password);
      users.create(user.username, user.email, user.salt, user.password, user.createdAt, user.modifiedAt, function (err, data) {
        if (err) {
          res.render('error', {
            title: "Cannot to create a new user. Check for correctness your data.",
            error: err
          });
        } else {
          console.log('Your new account has been created and your a new id is ' + data[0].id);
        }
      });
    } else {
      //check password
      console.log(user[0]);
      User.prototype.checkPassword.call(user[0], password);
      console.log('In the database is already that username');
    }
  });
});
