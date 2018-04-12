/* eslint-disable no-unused-vars*/
'use strict';

require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const graphQLExpress = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { connect, setTimeout } = require('hruhru');
const QueryType = require('./app/api/types/QueryType');
const MutationType = require('./app/api/types/MutationType');
const SubscribeType = require('./app/api/types/SubscribeType');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
const cors = require('cors');
const MemoryStore = require('memorystore');

const makePassport = require('./app/passport');
const { strategy } = require('./app/authStrategy');
const routes = require('./app/routes');

const app = express();
const sessionStore = new session.MemoryStore();

connect(process.env.DB_URL, process.env.DB_TOKEN);
setTimeout(2 * 1000);

const corsOptions = {
    origin: 'http://localhost:9000',
    credentials: true
};

app.use(cors(corsOptions));

passport.use(strategy);
app.use(session({
    store: sessionStore,
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false
    }
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
    mutation: MutationType,
    subscription: SubscribeType
});
app.use('/api', graphQLExpress({
    schema,
    graphiql: true
}));

routes(app);

const port = process.env.PORT || 8080;

require('./app/websockets')(schema, sessionStore, app);

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});

module.exports = app;
