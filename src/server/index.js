'use strict';

require('babel-register');

global.navigator = { userAgent: 'all' };

const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// proxy setup
require('./proxy')(app);

// webpack auto compile
if (process.env.NODE_ENV === 'development') {
  require('./compiler')(app);
}

app.use(express.static(path.join(__dirname, '../../build')));

// this middleware to Express to return .js.gz so you can
// still load bundle.js from the html but will receive bundle.js.gz
app.get('/*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  return next();
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/index.html'));
});

// create server
app.listen(port, err => {
  if (err) {
    console.warn(err);
  } else {
    console.log(`App is listening at port ${port}`);
  }
});
