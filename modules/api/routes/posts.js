var express = require('express');
var router = express.Router();

var posts = undefined;
module.exports = router;
module.exports.configure = function (params) {
  posts = params.model;
}

var readpost = function (key, res, callback) {
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
    id: "",
    post: undefined
  });
});

router.post('/postsave', function (req, res, next) {
  ((req.body.docreate == 'create') ? posts.create : posts.update)(req.body.id, req.body.title, req.body.body, function (err) {
    if (err) {
      res.render('showerror', {
        title: "Could not update file",
        error: err
      });
    } else {
      res.redirect('/postview?key='+req.body.id);
    }
  });
});

router.get('/postview', function (req, res, next) {
  if (req.query.key) {
    readpost(req.query.key, res, function (err, data) {
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
    console.log(req.query.key);
    readpost(req.query.key, res, function (err, data) {
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
    readpost(req.query.key, res, function (err, data) {
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
