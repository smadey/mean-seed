var mysql = require('mysql');

var config = require('../config');
var db = require('../models');

if (!config.isRelease) {

    var dbInfo = config.dbInfo;

    var connection = mysql.createConnection({
        host: dbInfo.host,
        port: dbInfo.port,
        user: dbInfo.username,
        password: dbInfo.password
    });

    var sql = 'create database if not exists ' + dbInfo.name;

    connection.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            console.log('\nSync tables:');

            db.sequelize.sync({
                force: true,
                logging: console.log
            }).complete(function(err) {
                if (err) {
                    throw err[0];
                } else {
                    console.log('\nInitialize database successful!\n');
                    db.User.create({
                        username: 'admin',
                        password: '21232f297a57a5a743894a0e4a801fc3'
                    }).success(function(user) {
                        console.log('\nCreate User "admin" successful!\n');
                        process.exit();
                    });
                }
            });
        }
    });
}
