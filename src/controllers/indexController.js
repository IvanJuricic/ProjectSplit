var sql = require('mssql');
var validator = require('validator');
var indexController = function (dayList) {
    var getHr = function (req, res) {
        var dayListHr = [];
        for (var i = 0; i < dayList.length; i++) {
            if (dayList[i] === 'Monday') {
                dayListHr.push('Ponedjeljak');
            }
            else if (dayList[i] === 'Tuesday') {
                dayListHr.push('Utorak');
            }
            else if (dayList[i] === 'Wednesday') {
                dayListHr.push('Srijeda');
            }
            else if (dayList[i] === 'Thursday') {
                dayListHr.push('Četvrtak');
            }
            else if (dayList[i] === 'Friday') {
                dayListHr.push('Petak');
            }
            else if (dayList[i] === 'Saturday') {
                dayListHr.push('Subota');
            }
            else if (dayList[i] === 'Sunday') {
                dayListHr.push('Nedjelja');
            }
        }
        res.render('indexHr', {
            dayList: dayListHr,
        });

    };
    var getEng = function (req, res) {
        res.render('indexEng', {
            dayList: dayList,
        });
    };
    var getIndex = function (req, res) {
        res.redirect('/hr');
    };
    var postUnapprovedEventsHr = function (req, res) {
        var date = new Date();
        var request = new sql.Request();
        if (validator.isEmpty(req.body[2]) && req.body[0].length > 32 && req.body[0].length < 5) {
            res.send('Nešto nije u redu, provjerite ime događaja!');
        }
        else if (validator.isEmpty(req.body[2])) {
            res.send('Nešto nije u redu, provjerite vrijeme događaja!');
        }
        else if (validator.isEmpty(req.body[3])) {
            res.send('Nešto nije u redu, provjerite mjesto of događaja!');
        }
        else if (!validator.isEmail(req.body[4])) {
            res.send('Nešto nije u redu, provjerite Vašu e-mail adresu!');
        }
        else {
            var statement = "INSERT INTO unapprovedEvents (NAME,EVENTDATE,EVENTTIME,LOCATION,PERSONCONTACT,DESCRIPTION,MOREURL) VALUES('" + req.body[0] + "', '" + req.body[1] + "', '" + req.body[2] + "', '" + req.body[3] + "', '" + req.body[4] + "', '" + req.body[5] + "', '" + req.body[6] + "')";
            request.query(statement, function (err, recordset) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    res.send('Vaš događaj je uspješno dodan, pregledat ćemo ga i objaviti ubrzo, hvala na prijedlogu!');
                }
            });
        }
    };
     var postUnapprovedEventsEng = function (req, res) {
        var date = new Date();
        var request = new sql.Request();
        if (validator.isEmpty(req.body[2]) && req.body[0].length > 32 && req.body[0].length < 5) {
            res.send('Something went wrong, check the name of event!');
        }
        else if (validator.isEmpty(req.body[2])) {
            res.send('Something went wrong, check the time of event!');
        }
        else if (validator.isEmpty(req.body[3])) {
            res.send('Something went wrong, check the location of event!');
        }
        else if (!validator.isEmail(req.body[4])) {
            res.send('Something went wrong, check your email adress!');
        }
        else {
            var statement = "INSERT INTO unapprovedEvents (NAME,EVENTDATE,EVENTTIME,LOCATION,PERSONCONTACT,DESCRIPTION,MOREURL) VALUES('" + req.body[0] + "', '" + req.body[1] + "', '" + req.body[2] + "', '" + req.body[3] + "', '" + req.body[4] + "', '" + req.body[5] + "', '" + req.body[6] + "')";
            request.query(statement, function (err, recordset) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    res.send('Your event has been successfully added, we will check it out and publish it shortly, your input is appreciated!');
                }
            });
        }
    };

    return {
        getHr: getHr,
        getEng: getEng,
        getIndex: getIndex,
        postUnapprovedEventsHr:postUnapprovedEventsHr,
        postUnapprovedEventsEng:postUnapprovedEventsEng
    };
};

module.exports = indexController;