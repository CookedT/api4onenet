var express = require('express');
var router = express.Router();
var axios = require('axios')
var onenetApi = require('./onenetApi.js');

/* GET home page. */
router.get('/device/list', function(req, res, next) {
	// 输出 JSON 格式
	console.log('call /device/list')
	var url = 'http://api.heclouds.com/devices';
	var params = {
		// 'online': true
	};
	onenetApi.getDataFromOnenet(url, params, function (data) {
		var list = [];
		console.log(data.devices);
		for (var item of data.devices) {
			list.push({
				'id': item.id,
				'name': item.title,
				'desc': item.desc,
				'status': item.online ? '在线' : '离线'
			});
		}
		var response = {
			'list': list
		};
		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
    res.end(JSON.stringify(response))
	})
});

router.get('/device/detail', function(req, res, next) {
	// 输出 JSON 格式
	console.log('call /device/detail')
	var deviceId = req.query.deviceId;
	console.log(deviceId)
	var url = 'http://api.heclouds.com/devices/' + deviceId;
	var params = {};
	onenetApi.getDataFromOnenet(url, params, function (data) {
		var response = {
			'deviceId': data.id,
			'deviceName': data.title,
			'online': data.online
		};
		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
    res.end(JSON.stringify(response))
	})
});

router.post('/cmd', function(req, res, next) {
	var deviceId = req.body.deviceId;
	var cmd = req.body.cmd;
	var url = 'http://api.heclouds.com/cmds?device_id=' + deviceId;

	onenetApi.sendCmd2Onenet(url, cmd, function (data) {
		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
    	res.end(JSON.stringify(data))
	})
});

router.get('/display', function(req, res, next) {
	var deviceId = req.query.deviceId;
	console.log(deviceId)
	var params = {

	}

	var url = 'http://api.heclouds.com/devices/' + deviceId + '/datastreams/';
	onenetApi.getDataFromOnenet(url, params, function (data) {
		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
    	res.end(JSON.stringify(data))
	})
});

module.exports = router;
