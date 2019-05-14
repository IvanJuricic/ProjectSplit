var express = require('express');
var sql = require('mssql');
var request = require('request');
var cheerio = require('cheerio');
var indexRouter = express.Router();

var router = function (dayList) {
    var indexController = require('../controllers/indexController')(dayList);
    indexRouter.route('/')
         .get(indexController.getIndex);
    indexRouter.route('/hr')
        .get(indexController.getHr)
        .post(indexController.postUnapprovedEventsHr);
    indexRouter.route('/eng')
        .get(indexController.getEng)
        .post(indexController.postUnapprovedEventsEng);
    return indexRouter;
};

module.exports = router;