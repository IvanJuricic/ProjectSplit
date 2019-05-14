var sql = require('mssql');
var request = require('request');
var cheerio = require('cheerio');

var ScraperGetDataKinoEng = function (success) {
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    String.prototype.replaceAll = function (target, replacement) {
        return this.split(target).join(replacement);
    };

    //Funkcije

    var fillDatabaseCinestar = function (event, i, callback) {
        var moreUrl = event[4];
        var imgUrl = event[5];
        var name = event[0];
        var eventDate = event[1];
        var eventTime = event[2];
        var location = event[3];
        var eventType = 'Cinema';
        var netAdress = 'abc';
        var description = event[6];
        var sqlrequest1 = new sql.Request();
        var statement1 = "INSERT INTO KinoEng (NAME,EVENTDATE,EVENTTIME,LOCATION,NETADRESS,EVENTTYPE,MOREURL,IMGURL,DESCRIPTION) VALUES('" + name + "', '" + eventDate + "', '" + eventTime + "', '" + location + "', '" + netAdress + "','" + eventType + "', '" + moreUrl + "','" + imgUrl + "','" + description + "')";

        sqlrequest1.query(statement1, function (err) {
            if (err) {
                console.log(err);
            }
            callback(i);
        });

    };


    var getEventsCinestar = function (i) {
        var date = new Date();
        date.addDays(i);
        if ((parseInt(date.getMonth()) + 1) > 9) {
            if (date.getDate() > 9) {
                var elementUrl = 'http://www.blitz-cinestar.hr/cinestar-split/' + date.getFullYear() + (parseInt(date.getMonth()) + 1) + date.getDate();
            }
            else {
                var elementUrl = 'http://www.blitz-cinestar.hr/cinestar-split/' + date.getFullYear() + (parseInt(date.getMonth()) + 1) + '0' + date.getDate();
            }
        }
        else {
            if (date.getDate() > 9) {
                var elementUrl = 'http://www.blitz-cinestar.hr/cinestar-split/' + date.getFullYear() + '0' + (parseInt(date.getMonth()) + 1) + date.getDate();
            }
            else {
                var elementUrl = 'http://www.blitz-cinestar.hr/cinestar-split/' + date.getFullYear() + '0' + (parseInt(date.getMonth()) + 1) + '0' + date.getDate();
            }

        }
        request(elementUrl, function (err, response, html) {
            var event = [];
            var temp = [];
            if (!err) {
                var $ = cheerio.load(html);
                $('body > section > div:nth-child(1) > div > div.main_content > div.movie_content > div.content_list > div.list_wrapper > div > table > tr > td:nth-child(2) > table > tr:nth-child(2) > td').each(function (index, element) {
                    var data = $(element).text();
                    if (data !== '') {
                        temp.push(data);
                    }

                });
            }
            else {
                console.log(err);
            }
            var description = 'These movies are shown today:';
            for (var j = 0; j < temp.length; j++) {
                if (j === 0) {
                    description += ' ' + temp[j];
                } else {
                    description += ', ' + temp[j];
                }

            }
            description += '. You can find out more by clicking External Link'
            if ((parseInt(date.getMonth()) + 1) > 9) {
                if (date.getDate() > 9) {
                    var eventdate = date.getDate() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getFullYear();
                }
                else {
                    var eventdate = '0' + date.getDate() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getFullYear();
                }
            }
            else {
                if (date.getDate() > 9) {
                    var eventdate = date.getDate() + '-' + '0' + (parseInt(date.getMonth()) + 1) + '-' + date.getFullYear();
                }
                else {
                    var eventdate = '0' + date.getDate() + '-' + '0' + (parseInt(date.getMonth()) + 1) + '-' + date.getFullYear();
                }

            }
            event.push('Cinestar Cinema Schedule');
            event.push(eventdate);
            event.push('All day');
            event.push('@Joker');
            event.push(elementUrl);
            event.push('assets/Cinestar.png');
            event.push(description);
            fillDatabaseCinestar(event, i, function (i) {
                if (i < 6) {
                    console.log((i + 1) + '. dogadaj');
                    getEventsCinestar(i + 1);
                }
                else {
                    getEventsCineplexx(0);
                }
            });

        });
    };

    var fillDatabaseCineplexx = function (event, i, callback) {
        var moreUrl = event[4];
        var imgUrl = event[5];
        var name = event[0];
        var eventDate = event[1];
        var eventTime = event[2];
        var location = event[3];
        var eventType = 'Cinema';
        var netAdress = 'abc';
        var description = event[6];
        var sqlrequest1 = new sql.Request();
        var statement1 = "INSERT INTO KinoEng (NAME,EVENTDATE,EVENTTIME,LOCATION,NETADRESS,EVENTTYPE,MOREURL,IMGURL,DESCRIPTION) VALUES('" + name + "', '" + eventDate + "', '" + eventTime + "', '" + location + "', '" + netAdress + "','" + eventType + "', '" + moreUrl + "','" + imgUrl + "','" + description + "')";

        sqlrequest1.query(statement1, function (err) {
            if (err) {
                console.log(err);
            }
            callback(i);
        });

    };


    var getEventsCineplexx = function (i) {
        var date = new Date();
        date.addDays(i);
        if ((parseInt(date.getMonth()) + 1) > 9) {
            if (date.getDate() > 9) {
                var elementUrl = 'http://www.moj-film.hr/kino/info/cineplexx-split/' + date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate() + '/';
            }
            else {
                var elementUrl = 'http://www.moj-film.hr/kino/info/cineplexx-split/' + date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-0' + date.getDate() + '/';
            }
        }
        else {
            if (date.getDate() > 9) {
                var elementUrl = 'http://www.moj-film.hr/kino/info/cineplexx-split/' + date.getFullYear() + '-0' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate() + '/';
            }
            else {
                var elementUrl = 'http://www.moj-film.hr/kino/info/cineplexx-split/' + date.getFullYear() + '-0' + (parseInt(date.getMonth()) + 1) + '-0' + date.getDate() + '/';
            }

        }

        request(elementUrl, function (err, response, html) {
            var event = [];
            var temp = [];
            if (!err) {
                var $ = cheerio.load(html);
                $('.title a').each(function (index, element) {
                    var data = $(element).text();
                    if (data !== '') {
                        temp.push(data);
                    }

                });
            }
            else {
                console.log(err);
            }
            var description = 'These movies are shown today:';
            for (var j = 0; j < temp.length; j++) {
                if (j === 0) {
                    description += ' ' + temp[j];
                } else {
                    description += ', ' + temp[j];
                }

            }
            description += '. You can find out more by clicking External Link.'
            if ((parseInt(date.getMonth()) + 1) > 9) {
                if (date.getDate() > 9) {
                    var eventdate = date.getDate() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getFullYear();
                }
                else {
                    var eventdate = '0' + date.getDate() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getFullYear();
                }
            }
            else {
                if (date.getDate() > 9) {
                    var eventdate = date.getDate() + '-' + '0' + (parseInt(date.getMonth()) + 1) + '-' + date.getFullYear();
                }
                else {
                    var eventdate = '0' + date.getDate() + '-' + '0' + (parseInt(date.getMonth()) + 1) + '-' + date.getFullYear();
                }

            }
            event.push('Cineplexx Movie Schedule');
            event.push(eventdate);
            event.push('All day');
            event.push('@City Center One');
            event.push('http://www.cineplexx.hr/');
            event.push('assets/Cineplexx.png');
            event.push(description);
            fillDatabaseCineplexx(event, i, function (i) {
                if (i < 6) {
                    console.log((i + 1) + '. dogadaj');
                    getEventsCineplexx(i + 1);
                }
                else {
                    success();
                }
            });


        });
    };
    var sqlrequest2 = new sql.Request();

    sqlrequest2.query('Truncate table KinoEng', function (err) {
    });
    getEventsCinestar(0);
};

module.export = {scraperKinoEng: ScraperGetDataKinoEng};