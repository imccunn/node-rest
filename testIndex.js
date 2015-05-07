'use strict';

var appServer = require('./lib/server');

// Assure that a data directory exists
appServer.createDataDir();

// Add two endpoints to which data can be read/written
appServer.addResource('test1');
appServer.addResource('test2');

// Start listening on the specified port
appServer.start(3333);
