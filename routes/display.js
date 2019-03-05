var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// 输出 JSON 格式
	var response = {
		"first_name": 'guogang',
		"last_name": 'zhao'
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

module.exports = router;
