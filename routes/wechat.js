var express = require('express');
var router = express.Router();

var wechat = require('wechat');
var config = require('../config.js').wecharConfig;
var menu = require('../menu/menu.js');
// console.log(config);

router.use('/', wechat(config, function (req, res, next) 
{
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message)
    console.log('FromUserName =' + message.FromUserName);
    console.log('MsgType =' + message.MsgType);
    console.log('MsgContent =' + message.Content);
    var WechatAPI = require('wechat-api');
    var api = new WechatAPI('', '');
    if (message.FromUserName === 'diaosi') 
    {
        // 回复屌丝(普通回复)
        res.reply('hehe');
    }
    //For menu creation only
    else if((message.FromUserName == '') && (message.Content == 'createMenu'))
    {
        //if(message.content == 'createMenu')
        {
            console.log('message to createMenu');
            menu.createMenu();
            res.reply('createMenu ok');
        }
    }
    else if (message.MsgType === 'event')
    {
        // 关注事件
        if (message.Event ==='subscribe')
        {
            res.reply({
               content: '谢谢你的关注！',
               type: 'text'
            });
            /*api.sendImage(message.FromUserName, '', function (err, result) {
                res.reply({
                   content: JSON.stringify(result),
                   type: 'text'
                });
            });*/
        }
        else if (message.Event === 'CLICK')
        {
            // 在线客服
            if (message.EventKey === 'kefu')
            {
                api.getOnlineCustomServiceList(function (err, result){
                    res.reply({
                       content: result,
                       type: 'text'
                    });
                });
            }
        }
    }
    else 
    {
        if(message.MsgType === 'text')
        {
            var content = message.Content;
            if(content == 'tuwen')
            {
                // 回复高富帅(图文回复)
                res.reply([{
                    title: '测试图文消息',
                    description: '测试图文消息-1',
                    picurl: '',
                    url: ''
                }]);
            }
            else if (content == 'test')
            {
                /*api.getOnlineCustomServiceList(function (err, result){
                    res.reply({
                       content: JSON.stringify(result),
                       type: 'text'
                    });
                });
                api.createKfSession('kf2001@gh_c3fab56ac38f', message.FromUserName, function (err, result) {
                    res.reply({
                       content: JSON.stringify(result),
                       type: 'text'
                    });
                });*/
                api.uploadMaterial('/home/guogang/workspace/weixin_server/public/1.png', 'image', function (err, result) {
                    console.log(result)
                    res.reply({
                       content: JSON.stringify(result),
                       type: 'text'
                    });
                });
            }
            else
            {
                res.reply({
                   content: '你好',
                   type: 'text'
                });
                api.sendText(message.FromUserName, '这是第一条主动消息', function (err, result) {
                    api.sendText(message.FromUserName, '这是第二条主动消息', function (err, result) {});
                });
                
                /*api.sendImage(message.FromUserName, '', function (err, result) {
                    res.reply({
                       content: JSON.stringify(result),
                       type: 'text'
                    });
                });*/
            }
        }
        
    }
}));

module.exports = router;
