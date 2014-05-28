var db = require('../models');

var handler = require('../common/handler');
var utils = require('../common/utils');

exports.list = function(req, res){
    db.User.findAll().success(handler.success(res)).error(handler.error(res));
};

exports.get = function(req, res){
    var _where = {
        id: req.params.id
    };

    db.User.find({ where: _where }).success(handler.success(res)).error(handler.error(res));
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
            handler.userexist(res);
        }
        else {
            db.User.create(_model).success(function(user) {
                req.session.user = user;
                handler.success(res)(user);
            }).error(handler.error(res));
        }
    }).error(handler.error(res));

};

exports.update = function(req, res){
    var _where = {
        id: req.params.id
    };
    var _model = {
        username: req.body.username,
        password: utils.md5(req.body.password)
    }

    db.User.find({ where: _where }).success(function(item) {
        item.updateAttributes(_model).success(handler.success(res)).error(handler.error(res))
    }).error(handler.error(res));
};

exports.delete = function(req, res){
    var _where = {
        id: req.params.id
    };

    db.User.delete({ where: _where }).success(handler.success(res)).error(handler.error(res));
};

exports.login = function(req, res){
    var _where = {
        username: req.body.username,
        password: utils.md5(req.body.password)
    };

    db.User.find({ where: _where }).success(function(user) {
        req.session.user = user;
        handler.success(res)(user);
    }).error(handler.error(res));
};

exports.logout = function(req, res){
    req.session.user = null;
    handler.success(res)('');
};

exports.checkName = function(req, res) {
    var _where = {
        username: req.params.username
    };

    db.User.count({ where: _where }).success(handler.success(res)).error(handler.error(res));
};
