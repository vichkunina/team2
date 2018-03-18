'use strict';

const { error404 } = require('./controllers/errors');

module.exports = app => {
    app.all('*', error404);
};
