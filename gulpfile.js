var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var pm2 = require('pm2');

var jsFiles = ['*.js', 'src/**/*.js'];

// gulp.task('style', function () {
//     return gulp.src(jsFiles)
//         .pipe(jshint())
//         .pipe(jshint.reporter('jshint-stylish', {
//             verbose: true
//         }))
//         .pipe(jscs());
// });

// gulp.task('inject', function () {
//     var wiredep = require('gulp-wiredep');
//     var options = {
//         bowerJson: require('./bower.json'),
//         directory: './public/lib',
//         ignorePath: '../../public'
//     };

//     var inject = require('gulp-inject');
//     var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {
//         read: false
//     });
//     var injectOptions = {
//         ignorePath: '/public'
//     };

//     return gulp.src('./src/views/*.ejs')
//         .pipe(wiredep(options))
//         .pipe(inject(injectSrc, injectOptions))
//         .pipe(gulp.dest('./src/views'));
// });

gulp.task('serve', function () {
    
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 4000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        });
});
gulp.task('css', function () {
    gulp.src('public/css/**/*.css')
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
});
