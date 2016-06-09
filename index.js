'use strict';

/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
global.__base = __dirname;
app.start();
