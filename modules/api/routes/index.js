var express = require('express');
var notes = require('../models/notes');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Notes', notes: notes });
});

module.exports = router;
