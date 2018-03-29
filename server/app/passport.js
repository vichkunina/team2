'use strict';

module.exports = function (passport) {
    passport.serializeUser(async (token, done) => {
        done(null, token);
    });

    passport.deserializeUser((profile, done) => {
        done(null, profile);
    });
};
