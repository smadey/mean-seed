
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.sendfile('app/index.html');
};

exports.needLogin = function(req, res, next) {
    if(req.session.user) {
        next();
    }
    else {
        console.log('Please login');
    }
}

exports.needLogoff = function(req, res, next) {
    if(!req.session.user) {
        next();
    }
    else {
        console.log('You have login already');
    }
}
