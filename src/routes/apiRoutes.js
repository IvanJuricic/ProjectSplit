var express = require('express');
var sql = require('mssql');
var apiRouter = express.Router();

var router = function () {
    var apiController = require('../controllers/apiController')();
    apiRouter.route('/getEventsEng')
        .get(apiController.apiGetEventsEng);
    apiRouter.route('/getKinoEng')
        .get(apiController.apiGetKinoEng);
    apiRouter.route('/getKinoHr')
        .get(apiController.apiGetKinoHr);
    apiRouter.route('/getEventsHr')
        .get(apiController.apiGetEventsHr);
    apiRouter.route('/getLocations')
        .get(apiController.apiGetLocations);
    apiRouter.route('/getUnapprovedEvents')
        .get(apiController.apiGetUnapprovedEvents);
    apiRouter.route('/getApprovedEvents')
        .get(apiController.apiGetApprovedEvents);
    return apiRouter;
};

module.exports = router;