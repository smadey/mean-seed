var express = require('express');

var utils = require('../common/utils');

var toObject = utils.toObject;
var toFunction = utils.toFunction;
var toArray = utils.toArray;
var copyByKeys = utils.copyByKeys;

function createMsgCode(code, prefix, joinChar) {
    if(typeof joinChar !== 'string' || joinChar == '') {
        joinChar = '_';
    }
    return (prefix ? [prefix, code].join(joinChar) : code).toUpperCase();
}

function checkRequireKeys(body, requireKeys, msgPrefix) {
    var key, result;
    for(var i = 0, n = requireKeys.length; i < n; i++) {
        key = requireKeys[i];
        if(body[key] === undefined) {
            result = utils.getRes('warning', createMsgCode(key + '_MISSING', msgPrefix));
            break;
        }
    }
    return result;
}

/*
    example options:
    {
        model: db.User,
        msgPrefix: 'USER',
        router: router,
        autoInit: false,
        list: {
            beforeCallbacks: [utils.needLogin],
            include: [{ model: db.Other, as: 'Others' }],
            order: 'updatedAt desc'
        },
        get: {
            beforeCallbacks: [],
            include: [{ model: db.Other, as: 'Others' }]
        },
        post: {
            beforeCallbacks: [utils.needLogout, checkPassword],
            requireKeys: ['username', 'password', 'password2'],
            uniqueKeys: ['username'],
            createKeys: ['username', 'password', 'nickname', 'age', 'sex', 'telphone', 'email'],
            beforeCreate: function(model) {
                model.password = utils.md5(model.password);
            },
            afterCreate: function(model) {
                this.session.user = model;
            }
        },
        put: {
            beforeCallbacks: [utils.needLogin],
            requireKeys: ['id'],
            uniqueKeys: ['telphone', 'email'],
            updateKeys: ['nickname', 'age', 'sex', 'telphone', 'email']
            beforeUpdate: function(oldModel, newModel) {
            },
            afterUpdate: function(model) {
            }
        },
        delete: {
            beforeCallbacks: [utils.needLogin]
        }
    }
*/
var REST = function(options) {
    var self = this;

    options = options || {};

    this._router = express.Router();
    this._options = options;

    if(options.autoInit) {
        this.init();
    }

    return self;
};


REST.prototype = {
    getRouter: function() {
        return this._router;
    },

    init: function() {
        var self = this;

        var router = this._router;
        var options = this._options;
        var dbModel = options.model;

        var defaultMSG = {
            ALREADY_EXIST: createMsgCode('ALREADY_EXIST', options.msgPrefix),
            NOT_FOUND: createMsgCode('NOT_FOUND', options.msgPrefix),
            CREATE_SUCCESS: createMsgCode('CREATE_SUCCESS', options.msgPrefix),
            UPDATE_SUCCESS: createMsgCode('UPDATE_SUCCESS', options.msgPrefix),
            DELETE_SUCCESS: createMsgCode('DELETE_SUCCESS', options.msgPrefix)
        };

        if(options.list !==  false) {
            (function(list) {
                var callbacks = toArray(list.beforeCallbacks, 'function');
                var include = list.include;
                var order = list.order || 'updatedAt desc';

                callbacks.push(function(req, res) {
                    var _findOptions = {};
                    include && (_findOptions.include = include);
                    order && (_findOptions.order = order);

                    dbModel.findAll(_findOptions).success(function(data) {
                        res.send(utils.getRes('success', '', data));
                    }).error(function(err) {
                        res.send(utils.getRes('error', '', err));
                    });
                });

                router.get.apply(router, ['/'].concat(callbacks));

            })(toObject(options.list));
        }

        if(options.get !== false) {
            (function(get) {
                var callbacks = toArray(get.beforeCallbacks, 'function');
                var include = get.include;

                callbacks.push(function(req, res) {
                    var _findOptions = {};
                    _findOptions.where = { id: req.params.id };
                    include && (_findOptions.include = include);

                    dbModel.find(_findOptions).success(function(data) {
                        res.send(utils.getRes('success', '', data));
                    }).error(function(err) {
                        res.send(utils.getRes('error', '', err));
                    });
                });

                router.get.apply(router, ['/:id'].concat(callbacks));

            })(toObject(options.get));
        }

        if(options.post !== false) {
            (function(post) {
                var callbacks = toArray(post.beforeCallbacks, 'function');

                var requireKeys = toArray(post.requireKeys);
                var uniqueKeys = toArray(post.uniqueKeys);
                var createKeys = toArray(post.createKeys);
                var uniqueWarningCode = post.uniqueWarningCode || defaultMSG.ALREADY_EXIST;
                var beforeCreate = toFunction(post.beforeCreate);
                var afterCreate = toFunction(post.afterCreate);
                var successInfoCode = post.successInfoCode || defaultMSG.CREATE_SUCCESS;

                callbacks.push(function(req, res) {
                    var warningInfo = checkRequireKeys(req.body, requireKeys, options.msgPrefix);
                    if(warningInfo) {
                        res.send(warningInfo);
                        return;
                    }

                    var _where = copyByKeys(uniqueKeys, req.body);
                    var _model = copyByKeys(createKeys, req.body);

                    dbModel.count({ where: _where }).success(function(count) {
                        if(count > 0) {
                            res.send(utils.getRes('warning', uniqueWarningCode));
                        }
                        else {
                            beforeCreate(_model);

                            dbModel.create(_model).success(function(data) {
                                // hard code for save session after create user
                                afterCreate.call(req, data);

                                res.send(utils.getRes('success', successInfoCode, data));
                            }).error(function(err) {
                                res.send(utils.getRes('error', '', err));
                            });
                        }
                    }).error(function(err) {
                        res.send(utils.getRes('error', '', err));
                    });
                });

                router.post.apply(router, ['/'].concat(callbacks));

            })(toObject(options.post));
        }

        if(options.put !== false) {
            (function(put) {
                var callbacks = toArray(put.beforeCallbacks, 'function');

                var requireKeys = toArray(put.requireKeys);
                var uniqueKeys = toArray(put.uniqueKeys);
                var updateKeys = toArray(put.updateKeys);
                var uniqueWarningCode = put.uniqueWarningCode || defaultMSG.ALREADY_EXIST;
                var beforeUpdate = toFunction(put.beforeUpdate);
                var afterUpdate =toFunction(put.afterUpdate);
                var notFoundWarningCode = put.notFoundWarningCode || defaultMSG.NOT_FOUND;
                var successInfoCode = put.successInfoCode || defaultMSG.UPDATE_SUCCESS;

                callbacks.push(function(req, res) {
                    var warningInfo = checkRequireKeys(req.body, requireKeys, options.msgPrefix);
                    if(warningInfo) {
                        res.send(warningInfo);
                        return;
                    }

                    var _id = req.params.id;
                    var _where = copyByKeys(uniqueKeys, req.body);
                    var _model = copyByKeys(updateKeys, req.body);

                    _where.id = { not: _id };

                    dbModel.count({ where: _where }).success(function(count) {
                        if(count > 0) {
                            res.send(utils.getRes('warning', uniqueWarningCode));
                        }
                        else {
                            dbModel.find({ where: { id: _id } }).success(function(item) {
                                if(item) {
                                    beforeUpdate(item, _model);

                                    item.updateAttributes(_model).success(function(data) {
                                        afterUpdate(data);

                                        res.send(utils.getRes('success', successInfoCode, data));
                                    }).error(function(err) {
                                        res.send(utils.getRes('error', '', err));
                                    });
                                }
                                else {
                                    res.send(utils.getRes('warning', notFoundWarningCode));
                                }
                            }).error(function(err) {
                                res.send(utils.getRes('error', '', err));
                            });
                        }
                    });
                });

                router.put.apply(router, ['/:id'].concat(callbacks));

            })(toObject(options.put));
        }

        if(options.delete !== false) {
            (function(del) {
                var callbacks = toArray(del.beforeCallbacks, 'function');
                var notFoundWarningCode = del.notFoundWarningCode || defaultMSG.NOT_FOUND;
                var successInfoCode = del.successInfoCode || defaultMSG.DELETE_SUCCESS;

                callbacks.push(function(req, res) {
                    var _id = req.params.id;

                    dbModel.find({ where: { id: _id } }).success(function(item) {
                        if(item) {
                            item.destroy().success(function(data) {
                                res.send(utils.getRes('success', successInfoCode, data));
                            }).error(function(err) {
                                res.send(utils.getRes('error', '', err));
                            });
                        }
                        else {
                            res.send(utils.getRes('warning', notFoundWarningCode));
                        }
                    }).error(function(err) {
                        res.send(utils.getRes('error', '', err));
                    });
                });

                router.delete.apply(router, ['/:id'].concat(callbacks));

            })(toObject(options.delete));
        }
    },

    checkRequireKeys: checkRequireKeys
}

module.exports = REST;
