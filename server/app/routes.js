'use strict';

const { error404 } = require('./controllers/errors');
const auth = require('./controllers/auth');
const join = require('./controllers/join');

module.exports = app => {
    auth(app);
    join(app);
    app.all('*', error404);
};
