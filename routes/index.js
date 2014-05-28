var utils = require('../common/utils');
var reshandler = require('../common/responseHandler');

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
        reshandler.warning(res)('NOT_LOGIN');
    }
};

exports.needLogout = function(req, res, next) {
    if(!req.session.user) {
        next();
    }
    else {
        reshandler.warning(res)('NOT_LOGOUT');
    }
};
