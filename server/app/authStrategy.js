'use strict';

require('dotenv').config();
const passportGithub = require('passport-github');
const Token = require('./models/token');
const Github = require('./models/github');
const User = require('./models/user');

Github.makeLink('uid', User);
Token.makeLink('uid', User);

const strategy = new passportGithub.Strategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/login/return'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const github = await Github.getById(profile.id);
            const user = await User.getById(github.uid);
            const token = await Token.getById(profile.id);

            console.info(`User exist ${user.login}`);
            done(null, token);
        } catch (error) {
            console.info(error);

            const user = new User({
                login: profile.username,
                name: profile.displayName,
                githubId: profile.id,
                chats: [],
                date: Date.now()
            });

            const github = new Github({
                id: profile.id,
                uid: user.id
            });

            const token = new Token({
                id: profile.id,
                uid: user.id,
                exp: Date.now()
            });

            await github.save();
            await user.save();
            await token.save();

            done(null, token);
        }
    }
);

module.exports = { strategy };
