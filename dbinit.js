
var mysql = require('mysql');

var dbInfo = require('./config').dbInfo;

var db = require('./models');

var connection = mysql.createConnection({
    host: dbInfo.host,
    port: dbInfo.port,
    user: dbInfo.username,
    password : dbInfo.password
});

var sql = 'create database if not exists ' + dbInfo.name;

connection.query(sql, function(err, result) {
    if(err) {
        throw err;
    }
    else {
        console.log('\nSync tables:');

        db.sequelize.sync({ force: true, logging: console.log }).complete(function(err) {
            if(err) {
                throw err[0];
            }
            else {
                console.log('\nInitialize database successful!');
                process.exit();
            }
        });
    }
});
