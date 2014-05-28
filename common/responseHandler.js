
function getResponse(status, data) {
    return {
        status: status,
        data: data
    };
}

exports.success = function(res) {
    return function(data) {
        res.send(getResponse('success', data));
    }
};

exports.error = function(res) {
    return function(err) {
        res.send(getResponse('error', err));
    }
};

exports.warning = function(res) {
    return function(code) {
        var info = {
            code: code,
            msg: exports.WARNING_CODE[code]
        };
        res.send(getResponse('warning', info));
    }
};

exports.WARNING_CODE = {
    NOT_LOGOUT: 'Please logout!',
    NOT_LOGIN: 'Please login!',
    USERNAME_ALREADY_EXIST: 'Username already exist!',
    USERNAME_OR_PASSWORD_WRONG: 'Username or password wrong!'
};
