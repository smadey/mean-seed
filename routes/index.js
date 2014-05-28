var handler = require('../common/handler');

var utils = require('../common/utils')

exports.index = function(req, res){
    var type = utils.getClientDeviceType(req);
    console.log(type);
    if(type == 'desktop') {
        res.sendfile('app/index.html');
    }
    else {
        res.sendfile('app/index-full.html');
    }
};

exports.needLogin = function(req, res, next) {
    if(req.session.user) {
        next();
    }
    else {
        handler.notlogin(res);
    }
};

exports.needLogout = function(req, res, next) {
    if(!req.session.user) {
        next();
    }
    else {
        handler.notlogout(res);
    }
};
