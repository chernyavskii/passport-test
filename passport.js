module.exports = function(passport,userRepository,config){
    var FacebookStrategy = require('passport-facebook').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj,done) {
        done(null,obj);
    });

    passport.use( new FacebookStrategy({
            clientID: config.facebook_api_key,
            clientSecret: config.facebook_api_secret,
            callbackURL: config.callback_url
        },
        function (token,tokenSecret,profile,done) {
            process.nextTick(function () {
                return done(null,profile);
            });
        }
    ));

}