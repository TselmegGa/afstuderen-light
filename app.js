var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');

var jwtAuth = require('./middleware/jwt');

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var carsRouter = require('./routes/cars');
var historyRouter = require('./routes/history');
var db = require("./model/sequelize");

var app = express();
app.disable("x-powered-by");

// get config vars
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

db.sequelize.sync({ alter: true });

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/users', jwtAuth, usersRouter);
app.use('/cars', jwtAuth, carsRouter);
app.use('/history', jwtAuth, historyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
module.exports = app;
