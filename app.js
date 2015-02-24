'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');

var index = require('./routes/index');
var departures = require('./routes/departures');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/departures', departures);

app.use(errorHandler());

module.exports = app;
