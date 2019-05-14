var sql = require('mssql');
var request = require('request');
var cheerio = require('cheerio');

var scraperController = function () {

    var scraperGetDataInfozonaHr = function (req, res) {

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
            if (eventType === 'Mjuzza') {
                eventType = 'Glazba';
            }
            var netAdress = event[7];
            var eventDescription = event[8];
            var sqlrequest1 = new sql.Request();
            var statement1 = "INSERT INTO eventsHr (NAME,EVENTDATE,EVENTTIME,LOCATION,NETADRESS,EVENTTYPE,MOREURL,IMGURL,DESCRIPTION) VALUES('" + name + "', '" + eventDate + "', '" + eventTime + "', '" + location + "', '" + netAdress + "','" + eventType + "', '" + moreUrl + "','" + imgUrl + "','" + eventDescription + "')";
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
                if (eventType === 'Mjuzza') {
                    eventType = 'Glazba';
                }
                var eventDescription = event[9];
                var statement2 = "INSERT INTO eventsHr (NAME,EVENTDATE,EVENTTIME,LOCATION,NETADRESS,EVENTTYPE,MOREURL,IMGURL,DESCRIPTION) VALUES('" + name + "', '" + eventDate + "', '" + eventTime + "', '" + location + "', '" + netAdress + "','" + eventType + "', '" + moreUrl + "','" + imgUrl + "','" + eventDescription + "')";
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
                            console.log('gotov');
                        }
                    }
                });

            });
        };
        var getLinks = function (j) {
            var links = [];
            var date = new Date();
            date.addDays(j);
            var url = 'http://infozona.hr/kalendar/dnevni/' + date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate();
            request(url, function (err, response, html) {
                var events = [];
                if (!err) {
                    var $ = cheerio.load(html);
                    $('#main > div.tijelo > div.mjesec > div > ul > li > a').each(function (index, element) {
                        var data = $(element).attr('href');
                        if (data !== undefined) {
                            links.push(data);
                        }

                    });
                    getEvents(0, j, links);

                }
                else {
                    console.log(err);
                }
            });

        };

        //Pozivi Funkcija

        var sqlrequest2 = new sql.Request();

        sqlrequest2.query('Truncate table EventsHr', function (err) {
        });

        getLinks(0);

        res.render('scraper');
    };
    var scraperGetDataInfozonaEng = function (req, res) {

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
                            console.log('gotov');
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
                        console.log('gotov!');
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

        res.render('scraper');
    };

    var ScraperGetDataKinoHr = function (req, res) {
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
            var eventType = 'Film';
            var netAdress = 'abc';
            var description = event[6];
            var sqlrequest1 = new sql.Request();
            var statement1 = "INSERT INTO KinoHr (NAME,EVENTDATE,EVENTTIME,LOCATION,NETADRESS,EVENTTYPE,MOREURL,IMGURL,DESCRIPTION) VALUES('" + name + "', '" + eventDate + "', '" + eventTime + "', '" + location + "', '" + netAdress + "','" + eventType + "', '" + moreUrl + "','" + imgUrl + "','" + description + "')";

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
                    $('.naslov a').each(function (index, element) {
                        var data = $(element).text();
                        if (data !== '') {
                            temp.push(data);
                        }

                    });
                }
                else {
                    console.log(err);
                }
                var description = 'Ovi Filmovi se danas prikazuju:';
                for (var j = 0; j < temp.length; j++) {
                    if (j === 0) {
                        description += ' ' + temp[j];
                    } else {
                        description += ', ' + temp[j];
                    }

                }
                description += '. Više možete saznati klikom na gumb Vanjska poveznica.'
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
                event.push('Cinestar kino program');
                event.push(eventdate);
                event.push('Cijeli dan');
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
                        console.log('gotov, ide Cineplexx');

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
            var eventType = 'Film';
            var netAdress = 'abc';
            var description = event[6];
            var sqlrequest1 = new sql.Request();
            var statement1 = "INSERT INTO KinoHr (NAME,EVENTDATE,EVENTTIME,LOCATION,NETADRESS,EVENTTYPE,MOREURL,IMGURL,DESCRIPTION) VALUES('" + name + "', '" + eventDate + "', '" + eventTime + "', '" + location + "', '" + netAdress + "','" + eventType + "', '" + moreUrl + "','" + imgUrl + "','" + description + "')";

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
                var description = 'Ovi Filmovi se danas prikazuju:';
                for (var j = 0; j < temp.length; j++) {
                    if (j === 0) {
                        description += ' ' + temp[j];
                    } else {
                        description += ', ' + temp[j];
                    }

                }
                description += '. Više možete saznati klikom na gumb Vanjska poveznica.'
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
                event.push('Cineplexx kino program');
                event.push(eventdate);
                event.push('Cijeli dan');
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
                        console.log('gotov');
                    }
                });

            });
        };
        var sqlrequest2 = new sql.Request();

        sqlrequest2.query('Truncate table KinoHr', function (err) {
        });
        getEventsCinestar(0);

        res.render('scraper');

    };
    var ScraperGetDataKinoEng = function (req, res) {
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
                        console.log('gotov, ide Cineplexx');

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
                        console.log('gotov');
                    }
                }); 


            });
        };
        var sqlrequest2 = new sql.Request();

        sqlrequest2.query('Truncate table KinoEng', function (err) {
        });
        getEventsCinestar(0);

        res.render('scraper');

    };

    return {
        scraperGetDataInfozonaHr: scraperGetDataInfozonaHr,
        scraperGetDataInfozonaEng: scraperGetDataInfozonaEng,
        ScraperGetDataKinoHr: ScraperGetDataKinoHr,
        ScraperGetDataKinoEng: ScraperGetDataKinoEng
    };

    var ScheduledFun = function () {
        scraperGetDataInfozonaHr()
    }
};

module.exports = scraperController;

