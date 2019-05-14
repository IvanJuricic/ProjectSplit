var express = require('express');
var sql = require('mssql');
var apiRouter = express.Router();
var passport = require('passport');

var router = function () {
    var adminController = require('../controllers/adminController')();
    apiRouter.route('/unApprovedEventRemove')
        .post(adminController.adminUnapprovedEventRemove);
    apiRouter.route('/approvedEventRemove')
        .post(adminController.adminApprovedEventRemove);
    apiRouter.route('/approveEvent')
        .post(adminController.adminApproveEvent);
    apiRouter.route('/')
        .get(adminController.getAdmin);
    apiRouter.route('/adminLogin')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.render('admin');
        });
    return apiRouter;
};

module.exports = router;
