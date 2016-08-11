var express = require('express');
var router = express.Router();

router.post('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
