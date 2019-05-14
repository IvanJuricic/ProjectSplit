var sql = require('mssql');
var validator = require('validator');

var apiController = function () {
    var apiGetEventsEng = function (req, res) {
        var request = new sql.Request();

        request.query('Select * from events', function (err, recordset) {
            res.send(recordset);
        });

    };
    var apiGetKinoHr = function (req, res) {
        var request = new sql.Request();

        request.query('Select * from KinoHr', function (err, recordset) {
            res.send(recordset);
        });

    };
    var apiGetKinoEng = function (req, res) {
        var request = new sql.Request();

        request.query('Select * from KinoEng', function (err, recordset) {
            res.send(recordset);
        });

    };
    var apiGetEventsHr = function (req, res) {
        var request = new sql.Request();

        request.query('Select * from eventsHr', function (err, recordset) {
            res.send(recordset);
        });

    };
    var apiGetLocations = function (req, res) {
        var request = new sql.Request();

        request.query('Select * from locations', function (err, recordset) {
            res.send(recordset);
        });

    };
    var apiGetUnapprovedEvents = function (req, res) {
        var request = new sql.Request();
        request.query('Select * from unapprovedEvents', function (err, recordset) {
            if (err) {
                console.log(err);
            }
            res.send(recordset);
        });
    };
    var apiGetApprovedEvents = function (req, res) {
        var request = new sql.Request();
        request.query('Select * from approvedEvents', function (err, recordset) {
            res.send(recordset);
        });
    };

    return {
        apiGetEventsEng: apiGetEventsEng,
        apiGetEventsHr: apiGetEventsHr,
        apiGetLocations: apiGetLocations,
        apiGetUnapprovedEvents: apiGetUnapprovedEvents,
        apiGetApprovedEvents: apiGetApprovedEvents,
        apiGetKinoHr:apiGetKinoHr,
        apiGetKinoEng:apiGetKinoEng
    };
};

module.exports = apiController;