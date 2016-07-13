var express = require('express');
var router = express.Router();

var notes = undefined;
module.exports = router;
module.exports.configure = function (params) {
  notes = params.model;
}

var readNote = function (key, res, callback) {
  notes.read(key, function (err, data) {
    if (err) {
      res.render('showerror', {
        title: 'Could not read note ' + key,
        error: err
      });
    } else {
      callback(null, data);
    }
  });
}

router.get('/noteadd', function (req, res, next) {
  res.render('noteedit', {
    title: "Add a Note",
    docreate: true,
    notekey: "",
    note: undefined
  });
});

router.post('/notesave', function (req, res, next) {
  ((req.body.docreate == 'create') ? notes.create : notes.update)(req.body.notekey, req.body.title, req.body.body, function (err) {
    if (err) {
      res.render('showerror', {
        title: "Could not update file",
        error: err
      });
    } else {
      res.redirect('/noteview?key='+req.body.notekey);
    }
  });
});

router.get('/noteview', function (req, res, next) {
  if (req.query.key) {
    readNote(req.query.key, res, function (err, data) {
      if (!err) {
        res.render('noteview', {
          title: data[0].title,
          notekey: req.query.key,
          note: data[0]
        });
      }
    });
  } else {
    res.render('showerror', {
      title: 'No key given for Note',
      error: 'Must provide a Key to view a Note'
    });
  }
});

router.get('/noteedit', function (req, res, next) {
  if (req.query.key) {
    console.log(req.query.key);
    readNote(req.query.key, res, function (err, data) {
      if (!err) {
        res.render('noteedit', {
          title: data[0] ? ('Edit ' + data[0].title) : 'Add a Note',
          docreate: false,
          notekey: req.query.key,
          note: data[0]
        });
      }
    });
  } else {
    res.render('showerror', {
      title: 'No key given for Note',
      error: 'Must provide a Key to view a Note'
    });
  }
});

router.get('/notedestroy', function (req, res, next) {
  if (req.query.key) {
    readNote(req.query.key, res, function (err, data) {
      if (!err) {
        res.render('notedestroy', {
          title: data[0].title,
          notekey: req.query.key,
          note: data[0]
        });
      }
    });
  } else {
    res.render('showerror', {
      title: "No key given for Note",
      error: "Must provide a Key to view a Note"
    });
  }
});

router.post('/notedodestroy', function (req, res, next) {
  notes.destroy(req.body.notekey, function (err) {
    if (err) {
      res.render('showerror', {
        title: "Could not delete Note " + req.body.notekey,
        error: err
      });
    } else {
      res.redirect('/');
    }
  });
});
