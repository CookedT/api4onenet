var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: '这是一个测试页面',
  	message: '测试'
  });
});

module.exports = router;
