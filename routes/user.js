var db = require('../models');

var handler = require('../common/handler');
var utils = require('../common/utils');

exports.list = function(req, res){
    db.User.findAll().success(handler.success(res)).error(handler.error(res));
};

exports.get = function(req, res){
    var id = req.params.id;

    db.User.find({ where: { id: id } }).success(handler.success(res)).error(handler.error(res));
};

exports.create = function(req, res){
    var user = req.body;

    db.User.create(user).success(handler.success(res)).error(handler.error(res));
};


exports.update = function(req, res){
    var id = req.params.id,
        user = req.body;

    db.User.find({ where: { id: id } }).success(function(item) {
        item.updateAttributes(user).success(handler.success(res)).error(handler.error(res))
    }).error(handler.error(res));
};

exports.delete = function(req, res){
    var id = req.params.id;

    db.User.delete({ where: { id: id } }).success(handler.success(res)).error(handler.error(res));
};
