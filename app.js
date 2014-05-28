
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

app.get('/services/user', routes.needLogin);
app.get('/services/user', user.list);
app.get('/services/user/:id', user.get);
app.post('/services/user', user.create);
app.put('/services/user', user.update);
app.delete('/services/user/:id', user.delete);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
