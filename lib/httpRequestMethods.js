/**
 *    httpRequestMethods
 * 
 *    Just to allow for acces to http request handlers
 *    from one module.
 */

'use strict';

var get = require('./get'),
  post = require('./post'),
  patch = require('./patch'),
  put = require('./put'),
  rDelete = require('./delete');

module.exports = {
  GET: get,
  POST: post,
  PATCH: patch,
  PUT: put,
  DELETE: rDelete
};
