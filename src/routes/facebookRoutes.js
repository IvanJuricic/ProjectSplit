var express = require('express');
var sql = require('mssql');
var facebookRouter = express.Router();

var router = function () {
    var facebookController = require('../controllers/facebookController')();
    facebookRouter.route('/')
        .get(facebookController.redirectFacebook);
    facebookRouter.route('/auth')
        .get(facebookController.authFacebook);
    facebookRouter.route('/scraper')
        .get(facebookController.scraperFacebook);
    return facebookRouter;
};

module.exports = router;