var express = require('express');
var router = express.Router();

var utils = require('../common/utils');


router.get('/', function(req, res) {
    res.sendfile('app/index.html');
});


module.exports = router;
