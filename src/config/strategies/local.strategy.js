var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    }, function (username, password, done) {
        var user = {
            username: username,
            password: password
        };
        if (user.username === 'projectSplit' && user.password === '') {
            done(null, user);
        }
        else {
            done('Bad credentials', null);
        }

    }));
}