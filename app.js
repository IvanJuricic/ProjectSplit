var express = require('express');
var sql = require('mssql');
var request = require('request');
var cheerio = require('cheerio');
var validator = require('validator');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
process.env.NODE_ENV = 'production';
var port = process.env.PORT || 4000;

var config = {
    user: 'Borna',
    password: '',
    server: '',
    database: 'Events',

    options: {
        encrypt: true
    }
};

sql.connect(config, function (err) {
    console.log(err);
});
Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};
var dayList = [];
for (var i = 0; i < 7; i++) {
    var date = new Date();
    date.addDays(i);
    if (date.getDay() === 0) {
        dayList.push('Sunday');
    }
    else if (date.getDay() === 1) {
        dayList.push('Monday');
    }
    else if (date.getDay() === 2) {
        dayList.push('Tuesday');
    }
    else if (date.getDay() === 3) {
        dayList.push('Wednesday');
    }
    else if (date.getDay() === 4) {
        dayList.push('Thursday');
    }
    else if (date.getDay() === 5) {
        dayList.push('Friday');
    }
    else if (date.getDay() === 6) {
        dayList.push('Saturday');
    }

}
var scraperRouter = require('./src/routes/scraperRoutes')();
var apiRouter = require('./src/routes/apiRoutes')();
var adminRouter = require('./src/routes/adminRoutes')();
var indexRouter = require('./src/routes/indexRoutes')(dayList);
var scraperHr = require('./src/services/scraperHr');
var scraperEng = require('./src/services/scraperEng');
var scraperKinoEng = require('./src/services/scraperKinoEng');
var scraperKinoHr = require('./src/services/scraperKinoHr');

var facebookRouter = require('./src/routes/facebookRoutes')();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'boboSmrad',
    resave: true,
    saveUninitialized: true
}));

require('./src/config/passport.js')(app);

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(('/admin'), adminRouter);
app.use(('/api'), apiRouter);
app.use(('/'), indexRouter);
app.use(('/scraper'), scraperRouter);
app.use(('/facebook'), facebookRouter);
app.listen(port, function (err) {
    console.log('listening on ' + port);
});
var schedule = require('node-schedule');
var SC = schedule.scheduleJob('1 * * *', function () {
    scraperHr.scraperHr(() => {
        scraperEng.scraperEng(() => {
            scraperKinoHr.scraperKinoEng(()=>{
                scraperKinoEng.scraperKinoEng(()=>{
                    
                });
            });
        });
    });
});