!/usr/local/bin node

'use strict';

var appServer = require('./lib/server');

appServer.createDataDir();

appServer.addResource('resource1');
appServer.addResource('resource2');
appServer.addResource('resource3');

appServer.start(3333);

module.exports = appServer;
