'use strict';

const { error404 } = require('./controllers/errors');
const auth = require('./controllers/auth');
const { openGraph } = require('./controllers/opengraph');

module.exports = app => {
    auth(app);
    app.get('/opengraph', openGraph);
    app.all('*', error404);
};
