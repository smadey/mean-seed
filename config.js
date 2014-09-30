
exports.port = 8888;

exports.cookieSecret = 'smadey-seed';

exports.isProduction = false;
exports.isRelease = false;


var dbInfo = {
    type: 'mysql',
    username: 'root',
    password: '',
    host: '127.0.0.1',
    port: '3306',
    name: 'seed'
};

function getConnectionUrl(type, username, password, host, port, name) {
    if(typeof type == 'object') {
        name = type.name;
        port = type.port;
        host = type.host;
        password = type.password;
        username = type.username;
        type = type.type;
    }
    return type + '://' + username + ':' + password + '@' + host + ':' + port + '/' + name;
}
exports.dbInfo = dbInfo;
exports.dbUrl = getConnectionUrl(dbInfo);
