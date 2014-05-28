var db = require('../models');

var utils = require('../common/utils');
var reshandler = require('../common/responseHandler');

exports.list = function(req, res){
    db.User.findAll().success(reshandler.success(res)).error(reshandler.error(res));
};

exports.get = function(req, res){
    var _where = {
        id: req.params.id
    };

    db.User.find({ where: _where }).success(reshandler.success(res)).error(reshandler.error(res));
};

exports.create = function(req, res){
    var _where = {
        username: req.body.username
    };
    var _model = {
        username: req.body.username,
        password: utils.md5(req.body.password)
    };

    db.User.count({ where: _where }).success(function(count) {
        if(count > 0) {
            reshandler.warning(res)('USERNAME_ALREADY_EXIST');
        }
        else {
            db.User.create(_model).success(function(user) {
                req.session.user = user;
                reshandler.success(res)(user);
            }).error(reshandler.error(res));
        }
    }).error(reshandler.error(res));

};

exports.update = function(req, res){
    var _where = {
        id: req.params.id
    };
    var _model = {},
        allowUpdateKeys = ['nickname', 'age', 'sex', 'telphone', 'email'];

    allowUpdateKeys.forEach(function(key) {
        if(req.body[key] !== undefined) {
            _model[key] = req.body[key];
        }
    });

    db.User.find({ where: _where }).success(function(item) {
        item.updateAttributes(_model).success(reshandler.success(res)).error(reshandler.error(res))
    }).error(reshandler.error(res));
};

exports.delete = function(req, res){
    var _where = {
        id: req.params.id
    };

    db.User.delete({ where: _where }).success(reshandler.success(res)).error(reshandler.error(res));
};

exports.login = function(req, res){
    var _where = {
        username: req.body.username,
        password: utils.md5(req.body.password)
    };

    db.User.find({ where: _where }).success(function(user) {
        if(user == null) {
            reshandler.warning(res)('USERNAME_OR_PASSWORD_WRONG');
        }
        else {
            req.session.user = user;
            reshandler.success(res)(user);
        }
    }).error(reshandler.error(res));
};

exports.logout = function(req, res){
    req.session.user = null;
    reshandler.success(res)();
};

exports.checkName = function(req, res) {
    var _where = {
        username: req.params.username
    };

    db.User.count({ where: _where }).success(reshandler.success(res)).error(reshandler.error(res));
};
