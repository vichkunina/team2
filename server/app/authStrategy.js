'use strict';

const config = require('config');
const passportGithub = require('passport-github');
const Github = require('./models/Github');
const User = require('./models/User');
const UserIdLogin = require('./models/UserIdLogin');
const GithubAvatar = require('./tools/githubAvatar');

Github.makeLink('uid', User);

const strategy = new passportGithub.Strategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${config.get('host')}/login/return`
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const github = await Github.getById(profile.id);
            const user = await User.getById(github.uid);

            console.info(`User exist ${user.login}`);
            done(null, user);
        } catch (error) {
            console.info(error.message);

            const user = new User({
                login: profile.username,
                name: profile.displayName,
                githubId: profile.id,
                contacts: [],
                chats: [],
                date: Date.now(),
                avatar: new GithubAvatar(profile.username, 200).toImgSrc()
            });

            const github = new Github({
                id: profile.id,
                uid: user.id
            });

            const userIdLogin = new UserIdLogin({
                login: profile.username,
                userId: user.id
            });

            await userIdLogin.save();
            await github.save();
            await user.save();

            done(null, user);
        }
    }
);

module.exports = { strategy };
