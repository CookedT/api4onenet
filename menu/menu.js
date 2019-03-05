var config = require('../config.js');  
var API = require('wechat-api'); 


function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    if(a[propName] instanceof Object ){
            if(!isObjectValueEqual(a[propName],b[propName])) return false;
    }
    else if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}

function getMenu()
{
    var menuData =  wechatApi.getMenu();
}

exports.createMenu = function()
{
	  console.log('createMenu in');
    var WechatAPI = require('wechat-api');
    var api = new WechatAPI('wxf6e3217b93ca3a56', 'ddaffbd2135f3cc87a70b9cab34da85a');
    //var api = new WechatAPI(config.config.appid, config.config.appsecret);
    
    //var API = require('wechat-api');
    //var api = new API(config.config.appid, config.config.appsecret); 
    //var api = new API('wxf6e3217b93ca3a56', 'd4624c36b6795d1d99dcf0547af5443d'); 
    console.log('createMenu in 1');
    api.getAccessToken(function (err, token) 
    {  
        console.log(err);  
        console.log(token);  //accessToken
    });  
    console.log('createMenu in 1.1');
    /*
    var oldMenuData =  api.getMenu(function (err, result) 
    {  
        console.log(result); // { errcode: 0, errmsg: 'ok' }
    });//Already set menu info
    */
    console.log('createMenu in 2');
    var newMenu = JSON.stringify(require('./menu.json')); //Menu info to set
    console.log('createMenu in 3');
   // if(!isObjectValueEqual(oldMenuData,newMenu)) {
    /*
        api.removeMenu(function(err, result) 
        {  
           console.log(result); // { errcode: 0, errmsg: 'ok' }
        });
    */
    console.log(newMenu);
    api.createMenu(newMenu, function (err, result) 
    {  
        console.log(result); // { errcode: 0, errmsg: 'ok' }
    }); 
   // }   
}



