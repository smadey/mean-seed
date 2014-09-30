define(function() {
    /**!
     * 微信内置浏览器的Javascript API，功能包括：
     *
     * 1、分享到微信朋友圈
     * 2、分享给微信好友
     * 3、分享到腾讯微博
     * 4、隐藏/显示右上角的菜单入口
     * 5、隐藏/显示底部浏览器工具栏
     * 6、获取当前的网络状态
     * 7、调起微信客户端的图片播放组件
     */
    var WechatApi = function () {

        var weixinJSBridgeReady = function(callback) {
            if (typeof WeixinJSBridge == 'undefined') {
                var handler = function(evt) {
                    callback(WeixinJSBridge);
                };

                if(document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', handler, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', handler);
                    document.attachEvent('onWeixinJSBridgeReady', handler);
                }
            } else {
                callback(WeixinJSBridge);
            }
        };

        var weixinShareTimeline = function(callback) {
            weixinJSBridgeReady(function() {
                WeixinJSBridge.on('menu:share:timeline', function() {
                    callback(WeixinJSBridge);
                });
            });
        };

        var weixinSendAppMessage = function(callback) {
            weixinJSBridgeReady(function() {
                WeixinJSBridge.on('menu:share:appmessage', function() {
                    callback(WeixinJSBridge);
                });
            });
        };

        var weixinShareWeibo = function(callback) {
            weixinJSBridgeReady(function() {
                WeixinJSBridge.on('menu:share:weibo', function() {
                    callback(WeixinJSBridge);
                });
            });
        };

        var showOptionMenu = function() {
            weixinJSBridgeReady(function() {
                WeixinJSBridge.call('showOptionMenu');
            });
        };

        var hideOptionMenu = function() {
            weixinJSBridgeReady(function() {
                WeixinJSBridge.call('hideOptionMenu');
            });
        };

        var hideToolbar = function() {
            weixinJSBridgeReady(function() {
                WeixinJSBridge.call('hideToolbar');
            });
        };

        var showToolbar = function() {
            weixinJSBridgeReady(function() {
                WeixinJSBridge.call('showToolbar');
            });
        };

        var getNetworkType = function() {
            // @todo
        };

        var imagePreview = function() {
            // @todo
        };

        var init = function(options) {
            var img_url = options.img_url || (location.origin + '/favicon.ico');
            var link = options.imgUrl || location.href;
            var title = options.title || 'Title';
            var description = options.description || 'Description!';
            var appid = options.appid || '';

            hideToolbar();
            weixinSendAppMessage(function(WeixinJSBridge) {
                WeixinJSBridge.invoke('sendAppMessage',{
                    'appid': appid,
                    'img_url': img_url,
                    'img_width': '200',
                    'img_height': '200',
                    'link': link,
                    'desc': description,
                    'title': title
                }, function(res) {
                    // alert('Share failed:' + res.err_msg);
                });
            });

            weixinShareTimeline(function(WeixinJSBridge) {
                WeixinJSBridge.invoke('shareTimeline', {
                    'img_url': img_url,
                    'img_width': '200',
                    'img_height': '200',
                    'link': link,
                    'desc': description,
                    'title': title
                }, function(res) {
                    // alert('Share failed:' + res.err_msg);
                });
            });

            weixinShareWeibo(function(WeixinJSBridge) {
                WeixinJSBridge.invoke('shareWeibo',{
                    'content': description,
                    'url': link,
                }, function(res) {
                    // alert('Share failed:' + res.err_msg);
                });
            });
        };


        return {
            ready: weixinJSBridgeReady,
            shareToTimeline: weixinShareTimeline,
            shareToWeibo: weixinShareWeibo,
            shareToFriend: weixinSendAppMessage,
            showOptionMenu: showOptionMenu,
            hideOptionMenu: hideOptionMenu,
            showToolbar: showToolbar,
            hideToolbar: hideToolbar,
            getNetworkType: getNetworkType,
            imagePreview: imagePreview,
            init: init
        };
    };

    return WechatApi();
});
