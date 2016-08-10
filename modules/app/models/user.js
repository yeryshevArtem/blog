var express = require('express');
var crypto = require('crypto');

function User (username, password, email) {
  var now = new Date ();
  var isoDate = new Date(now).toISOString();
  this.username = username;
  this.password = password;
  this.salt = Math.random() + '';
  this.email = email;
  this.createdAt = isoDate;
  this.modifiedAt = isoDate;
};
User.prototype.encryptPassword = function (password) {
  if (!this.salt) {
    return crypto.createHmac('sha1', this.salt_password).update(password).digest('hex');
  } else {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  }
};
User.prototype.checkPassword = function (password) {
  if (this.hashed_password === User.prototype.encryptPassword.call(this, password)) {
    console.log('Welcome our user');
  } else {
    throw new Error();
  }
};

module.exports = User;
