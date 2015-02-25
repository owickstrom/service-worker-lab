'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');

var app = express();

var departures = require('./departures.json');

app.use(logger('dev'));

app.get('/departures', function (req, res) {
  departures.lastUpdate = new Date();
  setTimeout(function () {
    res.json(departures);
  }, 2000);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler());

module.exports = app;
