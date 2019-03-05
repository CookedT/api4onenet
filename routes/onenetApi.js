var config = require('../config.js').onenetConfig;

function postRequest (url, data, callback) {
	var axios = require('axios');
  console.log('--------url--------');
  console.log(url);
	axios({
		method: 'post',
    url: url,
    headers: {
    	'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'api-key': config.masterAPIKey
    },
    //params: params,
    data: data
  }).then((response) => {
    callback(response.data);
  }).catch((e) => {
      console.log(e)
      callback(e);
  })
}

function getRequest (url, params, callback) {
  var axios = require('axios');
  console.log('--------url--------');
  console.log(url);
  axios({
    method: 'get',
    url: url,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'api-key': config.masterAPIKey
    },
    params: params
  }).then((response) => {
    // console.log(response.data)
    callback(response.data);
  }).catch((e) => {
      console.log(e)
      callback(e);
  })
}

function getDataFromOnenet (url, params, callback) {
  getRequest(url, params, function (data) {
    callback(data.data);
  });
}

function sendCmd2Onenet (url, cmd, callback) {
  postRequest(url, cmd, function (data) {
    callback(data.msg)
  });
}

module.exports = {
  sendCmd2Onenet,
  getDataFromOnenet
};