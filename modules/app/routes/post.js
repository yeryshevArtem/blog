var express = require('express');
var router = express.Router();
var url = require('url');

var posts = undefined;
module.exports = router;
module.exports.configure = function (params) {
  posts = params.model;
}
//Function for return id from url
function returnID (urlParams) {
  var returnedUrl = url.parse(urlParams).pathname;
  return returnedUrl.slice(returnedUrl.lastIndexOf('/') + 1);
}

router.get('/post/:id', function (req, res) {
  var id = returnID(req.url);
  posts.read(id, function (err, post) {
    if (err) {
      res.render('error', {
        title: 'Could not retrieve post information from data store',
        error: err
      });
    } else {
      res.render('postview', {
        title: post[0].title,
        post: post[0],
        user: res.locals.user
      });
    }
  });
});
