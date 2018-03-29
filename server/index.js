'use strict';

const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const graphql = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { connect, setTimeout } = require('hruhru');
const QueryType = require('./app/api/types/QueryType');
const morgan = require('morgan');

const app = express();

connect(process.env.DB_URL, process.env.DB_TOKEN);
setTimeout(2 * 1000);

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const schema = new GraphQLSchema({
    query: QueryType
});
app.use('/api', graphql({
    schema,
    graphiql: true
}));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});

module.exports = app;
