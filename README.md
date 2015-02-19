node-rest
---------

A basic REST framework in node. Handles post, get, put, patch and delete requests for user specified resources/endpoints.

  var app = require('./lib/server');
  app.createDataDir();
  app.addResource('resource1');
  app.addResource('resource2');
  app.start(3333);


