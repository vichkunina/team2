'use strict';

const passport = require('passport');
// const connectEnsureLogin = require('connect-ensure-login');

module.exports = app => {
    // Главная страница
    app.get(
        '/',
        (req, res) => {
            if (req.isAuthenticated()) {
                res.render('index', { tokenID: req.user.id });
            } else {
                res.send('Not authenticated!');
            }
        }
    );

    // Маршрут для входа
    app.get(
        '/login',
        // Аутентифицируем пользователя через стратегию GitHub
        // Если не удается, отправляем код 401
        passport.authenticate('github')
    );

    // Маршрут, на который пользователь будет возвращён после авторизации на GitHub
    app.get(
        '/login/return',
        // Заканчиваем аутентифицировать пользователя
        // Если не удачно, то отправляем на /
        passport.authenticate('github', { failureRedirect: '/' }),
        (req, res) => {
            res.redirect('/');
        }
    );


    // Маршрут для выхода пользователя
    app.get(
        '/logout',
        (req, res) => {
            // Удаляем сессию пользователя из хранилища
            req.logout();
            // И отправляем на /
            res.redirect('/');
        }
    );

};
