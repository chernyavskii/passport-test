module.exports = function(passport,userRepository,config){
    var TwitterStrategy = require('passport-twitter').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj,done) {
        done(null,obj);
    });

    passport.use( new TwitterStrategy({
            consumerKey: config.twitter_api_key,
            consumerSecret: config.twitter_api_secret,
            callbackURL: config.callback_url
        },
        function (token,tokenSecret,profile,done) {
            process.nextTick(function () {
                return done(null,profile);
            });
        }
    ));

}