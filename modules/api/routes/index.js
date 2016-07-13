var express = require('express');
var router = express.Router();

var notes = undefined;
module.exports = router;
module.exports.configure = function (params) {
  notes = params.model;
}

router.get('/', function (req, res) {
  notes.titles(function (err, titles) {
    if (err) {
      res.render('showerror', {
        title: 'Could not retrieve note keys from data store',
        error: err
      });
    } else {
      res.render('index', {
        title: 'Notes',
        notes: titles
      });
    }
  });
});
