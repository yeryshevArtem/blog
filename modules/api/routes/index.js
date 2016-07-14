var express = require('express');
var router = express.Router();

var posts = undefined;
module.exports = router;
module.exports.configure = function (params) {
  posts = params.model;
}

router.get('/', function (req, res) {
  posts.titles(function (err, titles) {
    if (err) {
      res.render('showerror', {
        title: 'Could not retrieve post keys from data store',
        error: err
      });
    } else {
      res.render('index', {
        title: 'posts',
        posts: titles
      });
    }
  });
});
