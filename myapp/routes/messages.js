var express = require('express');
var router = express.Router();

/* GET messages listing. */
router.get('/', function(req, res) {
  res.respond("ok", 200);
});

module.exports = router;
