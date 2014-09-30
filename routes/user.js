var db = require('../models');

var utils = require('../common/utils');
var Rest = require('../common/rest');

var checkPassword = function(req, res, next) {
    if(req.body.password) {
        if(req.body.password.length < 5) {
            res.send(utils.getRes('warning', 'PASSWORD_LENGTH_AL_LEAST_5'));
        }
        else if(req.body.password2 !== req.body.password) {
            res.send(utils.getRes('warning', 'PASSWORD_MUST_BE_SAME'));
        }
        else {
            next();
        }
    }
    else {
        res.send(utils.getRes('warning', 'PASSWORD_MISSING'));
    }
};

var user = new Rest({
    model: db.User,
    msgPrefix: 'USER',
    router: router,
    list: {
        beforeCallbacks: [utils.needLogin]
    },
    get: {
        beforeCallbacks: [utils.needLogin],
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
    },
    delete: {
        beforeCallbacks: [utils.needLogin]
    }
});

var router = user.getRouter();

router.get('/islogin', function(req, res) {
    res.send(utils.getRes('success', '', !!req.session.user));
});

router.post('/login', utils.needLogout, function(req, res) {
    var warningInfo = user.checkRequireKeys(req.body, ['username', 'password'], user._options.msgPrefix);
    if(warningInfo) {
        res.send(warningInfo);
        return;
    }

    var _where = {
        username: req.body.username,
        password: utils.md5(req.body.password)
    };

    db.User.find({ where: _where }).success(function(user) {
        if(user) {
            req.session.user = user;
            res.send(utils.getRes('success', 'LOGIN_SUCCESS', user));
        }
        else {
            res.send(utils.getRes('warning', 'USERNAME_OR_PASSWORD_WRONG', user));
        }
    }).error(function(err) {
        res.send(utils.getRes('error', '', err));
    });
});

router.get('/logout', utils.needLogin, function(req, res) {
    req.session.user = null;
    res.send(utils.getRes('success'));
});

router.get('/check/:username', utils.needLogout, function(req, res) {
    var warningInfo = user.checkRequireKeys(req.params, ['username'], user._options.msgPrefix);
    if(warningInfo) {
        res.send(warningInfo);
        return;
    }

    var _where = {
        username: req.params.username
    };

    db.User.count({ where: _where }).success(function(count) {
        res.send(utils.getRes('success', '', count));
    }).error(function(err) {
        res.send(utils.getRes('error', '', err));
    });
});

user.init();

module.exports = router;
