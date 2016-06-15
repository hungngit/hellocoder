'use strict';
// Loads environment variables from .env
require('dotenv').config();
/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
global.__base = __dirname;
app.start();
