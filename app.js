'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler());

module.exports = app;
