var fs = require('fs');
var http = require('http');
var path = require('path');

var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var config = require('./config');

var app = express();

app.set('port', config.port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(cookieParser(config.cookieSecret));
app.use(session({ secret: config.cookieSecret, resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'app')));
app.use(favicon(path.join(__dirname, 'favicon.ico')));


// routes
var routes = require('./routes/index');
app.use('/', routes);

// dynamic load routes
fs.readdirSync(path.join(__dirname, 'routes')).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function(file) {
    var name = file.split('.')[0];
    var route = require('./routes/' + name);
    app.use('/services/' + name, route);
});

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something blew up!' });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}

module.exports = app;
