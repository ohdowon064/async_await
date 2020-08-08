var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('어씽크 어웨잇 홈화면');
});

module.exports = router;
