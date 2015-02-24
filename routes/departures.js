'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', function(req, res, next) {
  fs.readFile(path.resolve(__dirname, '../departures.json'), function (err, contents) {
    if (err) {
      next(err);
    } else {
      var departures = JSON.parse(contents);
      console.dir(departures.station.transfers.transfer[0]);
      res.render('departures', { departures: departures });
    }
  });
});

module.exports = router;
