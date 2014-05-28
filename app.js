
/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');

var express = require('express');

var config = require('./config');

var routes = require('./routes');
var user = require('./routes/user');

var app = express();

// all environments
app.set('port', config.port);
app.use(express.favicon(path.join(__dirname, 'favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(config.cookieSecret));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);

// app.get('/services/{model}', {model}.list);
// app.get('/services/{model}/:id', {model}.get);
// app.post('/services/{model}', {model}.create);
// app.put('/services/{model}', {model}.update);
// app.delete('/services/{model}/:id', {model}.delete);

app.get('/services/usercheck/:username', routes.needLogout);
app.get('/services/usercheck/:username', user.checkName);

app.post('/services/userregister', routes.needLogout);
app.post('/services/userregister', user.create);

app.post('/services/userlogin', routes.needLogout);
app.post('/services/userlogin', user.login);

app.get('/services/userlogout', routes.needLogin);
app.get('/services/userlogout', user.logout);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
