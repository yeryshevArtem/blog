var express = require('express');
var router = express.Router();
var url = require('url');

var posts = undefined;
module.exports = router;
module.exports.configure = function (params) {
  posts = params.model;
}

var readPost = function (key, res, callback) {
  posts.read(key, function (err, data) {
    if (err) {
      res.render('showerror', {
        title: 'Could not read post ' + key,
        error: err
      });
    } else {
      callback(null, data);
    }
  });
}

router.get('/postadd', function (req, res, next) {
  res.render('postedit', {
    title: "Add a post",
    docreate: true,
    post: undefined
  });
});

router.post('/postsave', function (req, res, next) {
  if (req.body.docreate == 'create') {
    posts.create(req.body.title, req.body.body, function (err, data) {
      if (err) {
        res.render('showerror', {
          title: "Could not update file",
          error: err
        });
      } else {
        var id = data[0].id;
        res.redirect('/postview?key='+id);
      }
    });
  } else {
    posts.update(req.body.id, req.body.title, req.body.body, function (err, data) {
      if (err) {
        res.render('showerror', {
          title: "Could not update file",
          error: err
        });
      } else {
        var id = data[0].id;
        res.redirect('/postview?key='+id);
      }
    });
  }
});

router.get('/postview', function (req, res, next) {
  if (req.query.key) {
    readPost(req.query.key, res, function (err, data) {
      if (!err) {
        res.render('postview', {
          title: data[0].title,
          id: req.query.key,
          post: data[0]
        });
      }
    });
  } else {
    res.render('showerror', {
      title: 'No key given for post',
      error: 'Must provide a Key to view a post'
    });
  }
});

router.get('/postedit', function (req, res, next) {
  if (req.query.key) {
    readPost(req.query.key, res, function (err, data) {
      if (!err) {
        res.render('postedit', {
          title: data[0] ? ('Edit ' + data[0].title) : 'Add a post',
          docreate: false,
          id: req.query.key,
          post: data[0]
        });
      }
    });
  } else {
    res.render('showerror', {
      title: 'No key given for post',
      error: 'Must provide a Key to view a post'
    });
  }
});

router.get('/postdestroy', function (req, res, next) {
  if (req.query.key) {
    readPost(req.query.key, res, function (err, data) {
      if (!err) {
        res.render('postdestroy', {
          title: data[0].title,
          id: req.query.key,
          post: data[0]
        });
      }
    });
  } else {
    res.render('showerror', {
      title: "No key given for post",
      error: "Must provide a Key to view a post"
    });
  }
});

router.post('/postdodestroy', function (req, res, next) {
  posts.destroy(req.body.id, function (err) {
    if (err) {
      res.render('showerror', {
        title: "Could not delete post " + req.body.id,
        error: err
      });
    } else {
      res.redirect('/');
    }
  });
});
