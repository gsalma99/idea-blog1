const path = require('path');
const session = require('express');
const express = require('express');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./config/config');
const sequelizeStore = require('connect-sessions-sequlize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 3000,
        httpOnly: true, 
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db:sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine);


