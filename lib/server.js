'use strict';

var HTTPServer = exports = module.exports = {}; //jshint ignore: line

var http = require('http');
var fs = require('fs');
var path = require('path');
var parseURL = require('./parseURL');
var Resource = require('./resource');

HTTPServer.createDataDir = function() {
	if (!fs.existsSync(this.dataRoot)) {
		fs.mkdirSync(this.dataRoot);
	}
};

HTTPServer.dataRoot = './data';

HTTPServer.define = http.createServer(function(req, res) {
  var urlData = parseURL(req.url);
  var route = urlData.route;
  if (typeof this.resources[req.url] === 'function') {
  	this.resources[req.url](req, res, urlData.fileIdentifier);
  } else {
  	res.writeHead(400, {'Conent-Type': 'text/plain'});
  	res.write('Invalid request URL or resource identifier: ' + req.url);
  	res.end();
  }
});

HTTPServer.addResource = function(name) {
	var dataLocation = name;
	var that = this;
	fs.mkdir(that.dataRoot + '/' + dataLocation, function(err) {
		if (err) {
			throw 'There was an error in trying to create a directory: ' + err;
		}
		// Creates a new resource location as an object, accessible by the URI
		that.resources[dataLocation] = new Resource(dataLocation);
		that.resources.resourcesCreated++;
		that.resources[dataLocation].id = that.resources.resourcesCreated;
	});
};

/**
 * Listing of all possible server resource locations.
 * @type {Array}
 */
HTTPServer.resources = {
	resourcesCreated: 0
};

/**
 * Starts the server on the passed port number.
 * @param  {int} portNumber The port number to listen on.
 * @return {none}            
 */
HTTPServer.start = function(portNumber) {
  this.define.listen(portNumber, function() {
    console.log('The server is listening on port ' + portNumber);
  });
};

