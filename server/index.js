/* eslint-disable no-unused-vars*/
'use strict';

require('dotenv').config();
const expressSession = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const graphql = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { connect, setTimeout } = require('hruhru');
const QueryType = require('./app/api/types/QueryType');
const MutationType = require('./app/api/types/MutationType');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
const cors = require('cors');
const WSServer = require('websocket').server;

const makePassport = require('./app/passport');
const { strategy } = require('./app/authStrategy');
const routes = require('./app/routes');

const app = express();


connect(process.env.DB_URL, process.env.DB_TOKEN);
setTimeout(2 * 1000);

const corsOptions = {
    origin: 'http://localhost:9000',
    credentials: true
};

app.use(cors(corsOptions));

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

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
app.use('/api', graphql({
    schema,
    graphiql: true
}));

routes(app);

const port = process.env.PORT || 8080;
const wsServer = new WSServer({
    httpServer: app
});

require('./app/websockets')(schema, wsServer);

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});

module.exports = app;
