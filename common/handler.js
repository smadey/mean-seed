
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

exports.userexist = function(res) {
    res.send(getResponse('userexist', 'Username already exist!'));
};


exports.notlogout = function(res) {
    res.send(getResponse('notlogout', 'Please logout!'));
};

exports.notlogin = function(res) {
    res.send(getResponse('notlogin', 'Please login!'));
};
