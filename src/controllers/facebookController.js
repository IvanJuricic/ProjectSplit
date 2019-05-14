var sql = require('mssql');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var OAuth2 = require('oauth').OAuth2;
var oauth2 = new OAuth2("2002842596603635",
    "a26f1b509774fc9b3c378fa3d32e2afa",
    "", "https://www.facebook.com/dialog/oauth",
    "https://graph.facebook.com/oauth/access_token",
    null);
var token;
var facebookController = function () {

    String.prototype.replaceAll = function (target, replacement) {
        return this.split(target).join(replacement);
    };

    var fillDatabase = function (eventList, eLocation, eType) {
        var sqlrequest1 = new sql.Request();
        var statement1 = "INSERT INTO eventsFacebook (NAME,EVENTDATE,EVENTTIME,LOCATION,NETADRESS,EVENTTYPE,MOREURL,IMGURL,DESCRIPTION) VALUES";
        for (var i = 0; i < eventList.length; i++) {
            eDate = '';
            for (var j = 0; j < 10; j++) {
                eDate += eventList[i].start_time[j];
            }
            eTime = '';
            for (var j = 11; j < 16; j++) {
                eTime += eventList[i].start_time[j];
            }
            eMoreUrl = "https://www.facebook.com/events/" + eventList[i].id + "/";
            eImgUrl = "https://graph.facebook.com/" + eventList[i].id + "/picture?access_token=" + token;
            eventList[i].description=eventList[i].description.replaceAll("'","''");
            statement1 += "('" + eventList[i].name + "', '" + eDate + "', '" + eTime + "', '" + eLocation + "', '" + "abc" + "','" + eType + "', '" + eMoreUrl + "','" + eImgUrl + "','" + eventList[i].description + "')";
            if (i !== eventList.length - 1) {
                statement1 += ',';
            }
        }

          sqlrequest1.query(statement1, function (err) {
                 if (err) {
                     console.log(err);
                 }
             });

    };

    var authFacebook = function (req, res) {
        var redirect_uri = "http://localhost:4000" + "/facebook";
        // For eg. "http://localhost:3000/facebook/callback"
        var params = { 'redirect_uri': redirect_uri, 'scope': 'user_about_me,publish_actions' };
        res.redirect(oauth2.getAuthorizeUrl(params));
    }
    var redirectFacebook = function (req, res) {
        var loginCode = req.query.code;
        console.log(loginCode);
        oauth2.getOAuthAccessToken(loginCode,
            {
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:4000/facebook'
            },
            function (err, accessToken, refreshToken, params) {
                if (err) {
                    console.error(err);
                    res.send(err);
                }
                var access_token = accessToken;
                token = access_token;
                var expires = params.expires;
                req.session.access_token = access_token;
                req.session.expires = expires;
                res.render('scraper');
            });
    };
    var scraperFacebook = function (req, res) {
        console.log(token);
        oauth2.get('https://graph.facebook.com/quasimodoklub/events', token, function (err, data, response) {
            if (err) {
                console.error(err);
                res.send(err);
            } else {
                var profile = JSON.parse(data);
                fillDatabase(profile.data, "@Quasimodo", "Glazba");
                res.render('scraper');
            }
        });
    }
    return {
        redirectFacebook: redirectFacebook,
        authFacebook: authFacebook,
        scraperFacebook: scraperFacebook
    };
};
module.exports = facebookController;