var baseUrl = 'https://open.iot.10086.cn/developer/common/v1/debug/request?';

function postRequest (url) {
	var axios = require('axios')
	axios({
		method: 'post',
    url: url,
    header: {
    	'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => {
  	var ret = {
  		code: '0',
  		data: response.data;
  	};
  	return ret;
  }).catch((e) => {
      console.log(e)
      var ret = {
	  		code: '-1',
	  		data: e;
	  	};
	  	return ret; 
  })
}

function sendCmd2Onenet (method, apiKey, url, deviceId, cmd) {
	var url = baseUrl + 'method=' + method + '&api_key=' + apiKey + '&url=' + url + '&parameter=device_id=' + deviceId + '&content=' + cmd;
	return postRequest(url);
}

function getDataFromOnenet (method, apiKey, url) {
	var url = baseUrl + 'method=' + method + '&api_key=' + apiKey + '&url=' + url;
	return postRequest(url);
}

module.exports = onenetApi;
