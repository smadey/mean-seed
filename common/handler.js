

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
}

exports.error = function(res) {
    return function(err) {
        res.send(getResponse('error', err));
    }
}
