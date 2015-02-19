'use strict';

var HTTPServer = exports = module.exports = {}; //jshint ignore: line

var http = require('http');
var fs = require('fs');
var path = require('path');
var parseURL = require('./parseURL');
var Resource = require('./resource');

/**
 *      Verifies that a data directory exists.
 * @return {none} 
 */
HTTPServer.createDataDir = function() {
	if (!fs.existsSync(this.dataRoot)) {
		fs.mkdirSync(this.dataRoot);
	}
};

/**
 *      Top-most directory to which data from requests should be written.
 *      
 * @type {String}
 */
HTTPServer.dataRoot = './data';

/**
 *      Creates the http server. Request route handlling is done here.
 * @return {none} 
 */
HTTPServer.define = http.createServer(function(req, res) {
			var urlData = parseURL(req.url);
			var route = urlData.route;
			console.log('Incoming request for: ' + route);

			if (HTTPServer.resources[route] !== 'undefined') {
				HTTPServer.resources[route].handleRequest(req, res, urlData.fileIdentifier);
			} else {
				res.writeHead(400, {'Conent-Type': 'text/plain'});
				res.write('Invalid request URL or resource identifier: ' + req.url);
				res.end();
			}
		});

/**
 *      addResource adds an endpoint to which data can have http methods applied to. 
 *      It will create a directory where data is written to and create a Resrouce object
 *      for tracking of file information.
 * 
 * @param {string} name A string that specifies the URI of the resource.
 */
HTTPServer.addResource = function(name) {
	var dataLocation = '/' + name;
	var that = this;
	fs.mkdir(that.dataRoot + dataLocation, function(err) {
		if (err) {
			throw 'There was an error in trying to create a directory: ' + err;
		}
		console.log('Resource about to be created.');
		// Creates a new resource location as an object, accessible by the URI
		console.log(dataLocation);
		that.resources[dataLocation] = new Resource(dataLocation);
		that.resources.resourcesCreated++;
		that.resources[dataLocation].id = that.resources.resourcesCreated;
		console.log(that.resources);
	});
	console.log(this.resources);
};

/**
 *      Listing of all possible server resource locations.
 *      Will contain Resource objects.
 * 
 * @type {Object}
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
