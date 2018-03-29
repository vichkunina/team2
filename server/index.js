/* eslint-disable no-unused-vars*/
'use strict';

require('dotenv').config();
const expressSession = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');

const { connect } = require('hruhru');
const makePassport = require('./app/passport');
const { strategy } = require('./app/authStrategy');
const routes = require('./app/routes');

const app = express();

connect('https://hrudb.herokuapp.com/', 'f93616128ff87d9e118aa7dcb21f27dac99b35ae');
passport.use(strategy);
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
makePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

const viewsDir = path.join(__dirname, 'app/views');

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});

module.exports = app;
