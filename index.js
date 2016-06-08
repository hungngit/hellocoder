'use strict';

/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
global.__base = __dirname;
console.log(global.__base);
app.start();
