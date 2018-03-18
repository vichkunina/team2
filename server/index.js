'use strict';

// const path = require('path');

const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const morgan = require('morgan');

const app = express();

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8080;

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});

module.exports = app;
