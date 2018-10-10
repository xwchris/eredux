'use strict';

let ERedux = null;

if (process.env.NODE_ENV === 'production') {
  ERedux = require('./dist/eredux.production.js');
} else {
  ERedux = require('./dist/eredux.development.js');
}

module.exports = ERedux.default || ERedux;
