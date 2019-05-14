var express = require('express');
var sql = require('mssql');
var request = require('request');
var cheerio = require('cheerio');
var scraperRouter = express.Router();

var router = function () {
    var scraperController = require('../controllers/scraperController')();
    scraperRouter.route('/InfozonaEng')
        .get(scraperController.scraperGetDataInfozonaEng);
    scraperRouter.route('/InfozonaHr')
        .get(scraperController.scraperGetDataInfozonaHr);
    scraperRouter.route('/KinoHr')
        .get(scraperController.ScraperGetDataKinoHr);
    scraperRouter.route('/KinoEng')
        .get(scraperController.ScraperGetDataKinoEng);
    return scraperRouter;
};

module.exports = router;