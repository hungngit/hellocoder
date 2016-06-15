'use strict';
var path = require('path');

/**
 * Module dependencies
 */

module.exports = function (app) {
  // Response with home Under Construction
  app.get('/', function (req, res) {
    res.send('Welcome to HELLO CODER – Under Construction');
  });
  // Response with public/web/admin/index.html
  app.route('/admin').get(function(req, res, next) {
    res.sendFile('index.html', { root: path.resolve('./public/web/admin/') });
  });

  // Response with public/web/blog/index.html
  app.route('/blog').get(function(req, res, next) {
    res.sendFile('index.html', { root: path.resolve('./public/web/blog/') });
  });

  // Response with public/web/chat/index.html
  app.route('/chat').get(function(req, res, next) {
    res.sendFile('index.html', { root: path.resolve('./public/web/chat/') });
  });
};
