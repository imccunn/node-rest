'use strict';

var appServer = require('./lib/server');

appServer.createDataDir();

appServer.addResource('things');
appServer.addResource('neatThings');

appServer.start(3333);

module.exports = appServer;
