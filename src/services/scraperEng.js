var sql = require('mssql');
var request = require('request');
var cheerio = require('cheerio');

var scraperGetDataInfozonaEng = function (success) {

    //alati(prototipovi)

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    String.prototype.replaceAll = function (target, replacement) {
        return this.split(target).join(replacement);
    };

    //Funkcije

    var fillDatabase = function (event, i, j, links, callback) {
        var moreUrl = event[0];
        var imgUrl = event[1];
        var name = event[2];
        var eventDate = event[3];
        var eventTime = event[4];
        var location = event[5];
        var eventType = event[6];
        var netAdress = event[7];
        var eventDescription = event[8];
        var sqlrequest1 = new sql.Request();
        var statement1 = "INSERT INTO events (NAME,EVENTDATE,EVENTTIME,LOCATION,NETADRESS,EVENTTYPE,MOREURL,IMGURL,DESCRIPTION) VALUES('" + name + "', '" + eventDate + "', '" + eventTime + "', '" + location + "', '" + netAdress + "','" + eventType + "', '" + moreUrl + "','" + imgUrl + "','" + eventDescription + "')";
        if (event.length === 9) {
            sqlrequest1.query(statement1, function (err) {
                if (err) {
                    console.log(err);
                }
                callback(i, j, links);

            });
        }
        else if (event.length === 10) {
            eventType = event[7];
            netAdress = event[8];
            var eventDescription = event[9];
            var statement2 = "INSERT INTO events (NAME,EVENTDATE,EVENTTIME,LOCATION,NETADRESS,EVENTTYPE,MOREURL,IMGURL,DESCRIPTION) VALUES('" + name + "', '" + eventDate + "', '" + eventTime + "', '" + location + "', '" + netAdress + "','" + eventType + "', '" + moreUrl + "','" + imgUrl + "','" + eventDescription + "')";
            sqlrequest1.query(statement2, function (err) {
                if (err) {
                    console.log(err);
                }
                callback(i, j, links);

            });
        }
    };
    var getEvents = function (i, j, links) {
        var elementUrl = 'http://infozona.hr/' + links[i];
        request(elementUrl, function (err, response, html) {
            var event = [];
            var temp = [];
            if (!err) {
                var $ = cheerio.load(html);
                $('body > div > div.share > a:nth-child(1)').each(function (index, element) {
                    var data = $(element).attr('href');
                    temp.push(data);
                });
                $('body > div > div.foto > img').each(function (index, element) {
                    var data = $(element).attr('src');
                    temp.push(data);
                });
                $('body > div > h1').each(function (index, element) {
                    var data = $(element).text();
                    data = data.replaceAll("'", "˙");
                    temp.push(data);
                });
                $('body > div > b').each(function (index, element) {
                    var data = $(element).text();
                    temp.push(data);
                });
                temp.push(elementUrl);
                $('body > div > p').each(function (index, element) {
                    var data = $(element).text();
                    temp.push(data);
                });

            }
            else {
                console.log(err);
            }
            var y = '';
            if (temp.length === 9) {
                y = temp[8];
                y = y.replaceAll('\n', '');
                y = y.replaceAll('\\', '');
                y = y.replaceAll('\'', '´');
                temp[8] = y;
            }
            else if (temp.length === 10) {
                y = temp[9];
                y = y.replaceAll('\n', '');
                y = y.replaceAll(String.fromCharCode(92), '');
                y = y.replaceAll(String.fromCharCode(34), String.fromCharCode(44));
                y = y.replaceAll(String.fromCharCode(39), String.fromCharCode(44));
                y = y.replaceAll('\'', '´');
                temp[9] = y;
            }
            var x = '';
            x = temp[3];
            dateFormat = [];
            if (x !== undefined) {
                x = x.replaceAll('/', '-');
                if (x.length === 8) {
                    x = '0' + x;
                }
                dateFormat = x.split('-');
                if (dateFormat[1].length < 2) {
                    dateFormat[1] = '0' + dateFormat[1];
                }
                x = dateFormat[0] + '-' + dateFormat[1] + '-' + dateFormat[2];
            }
            temp[3] = x;

            temp[5] = '@' + temp[5];

            event = temp;
            fillDatabase(event, i, j, links, function (i, j, links) {
                if (i < links.length - 1) {
                    console.log((i + 1) + '. dogadaj');
                    getEvents(i + 1, j, links);
                }
                else {
                    if (j < 25) {
                        getLinks(j + 1);
                    }
                    else {
                        success();
                    }
                }
            });

        });
    };
    var getLinks = function (j) {
        var links = [];
        var date = new Date();
        date.addDays(j);
        var url = 'http://infozona.hr/calendar/daily/' + date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate();
        request(url, function (err, response, html) {
            var events = [];
            if (!err) {
                var $ = cheerio.load(html);
                if ($('#main > div.tijelo > div.mjesec > div > ul > li > a').length !== 0) {
                    $('#main > div.tijelo > div.mjesec > div > ul > li > a').each(function (index, element) {
                        var data = $(element).attr('href');
                        if (data !== undefined) {
                            links.push(data);
                        }

                    });
                    getEvents(0, j, links);
                } else {
                    success();
                }


            }
            else {
                console.log(err);
            }
        });

    };

    //Pozivi Funkcija

    var sqlrequest2 = new sql.Request();

    sqlrequest2.query('Truncate table Events', function (err) {
    });

    getLinks(0);
};

module.export = {
    scraperInfozonaEng: scraperGetDataInfozonaEng
};