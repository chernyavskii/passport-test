const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const config = require('./config');
const dbcontext = require('./context/db')(Sequelize, config);
const errors = require('./utils/errors');

const userService = require('./services/user')(dbcontext.user,errors);

const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

const apiController = require('./controllers/api')(userService,  config, passport);
require('./passport')(passport,dbcontext.user,config);

app.use('/', apiController);

const port = process.env.PORT || 3000;
dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(port, () => console.log('Running'));
    })
    .catch((err) => console.log(err));