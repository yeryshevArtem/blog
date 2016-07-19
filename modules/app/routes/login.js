var express = require('express');
var router = express.Router();
var url = require('url');

var posts = undefined;
module.exports = router;
module.exports.configure = function (params) {
  posts = params.model;
}

router.get('/login', function (req, res) {
  res.render('login', {
    title: 'Welcome'
  });
});

router.get('/post/:id/login', function (req, res) {
  res.render('login', {
    title: 'Welcome'
  });
});
