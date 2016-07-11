var express = require('express');
var notes = require('../models/notes');
var router = express.Router();

router.get('/noteadd', function (req, res, next) {
  res.render('noteedit', {
    title: "Add a Note",
    docreate: true,
    notekey: "",
    note: undefined
  });
});

router.post('/notesave', function (req, res, next) {
  if (req.body.docreate == 'create') {
    notes.create(req.body.notekey, req.body.title, req.body.body);
  } else {
    notes.udpate(req.body.notekey, req.body.title, req.body.body);
  }
  res.redirect('/noteview?key='+req.body.notekey);
});

router.get('/noteview', function (req, res, next) {
  var note = undefined;
  if (req.query.key) {
    note = notes.read(req.query.key);
  }
  res.render('noteview', {
    title: note ? note.title : '',
    notekey: req.query.key,
    note: note
  });
});

router.get('/noteedit', function (req, res, next) {
  var note = undefined;
  if (req.body.key) {
    note = notes.read(req.query.key);
  }
  res.render('noteedit', {
    title: note ? ('Edit ' + note.title) : "Add a note",
    docreate: note ? false : true,
    notekey: req.query.key,
    note: note
  });
});

router.get('/notedestroy', function (req, res, next) {
  var note = undefined;
  if (req.query.key) {
    note = notes.read(req.query.key);
  }
  res.render('notedestroy', {
    title: note ? note.title : "",
    notekey: req.query.key,
    note: note
  });
});

router.post('/notedodestroy', function (req, res, next) {
  notes.destroy(req.body.notekey);
  res.redirect('/');
});

module.exports = router;
