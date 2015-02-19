'use strict';

var httpRH = require('./httpRequestMethods');
var fs = require('fs');

/**
 *      Resource object specifies URI and directory for data.
 *      Use this to track files at a resource location.
 * 
 * @param {string} path The path in the data directory to which data should be written.
 */
function Resource(path) {
	this.id = 0;
	this.path = path;
	this.root = './data';
	this.URI = this.root + this.path;
	this.fileCount = this.filesExtant();
	this.fileIDIndex = [];
	this.initDir();
}

/**
 *      Verify that the resources directory exists.
 * @return {none} 
 */
Resource.prototype.initDir = function() {
	// Program relies on './data' directory, check existence
	if (!fs.existsSync(this.URI)) {	
	  fs.mkdirSync(this.URI);
	}
};

/**
 *      Determines how many files at this resource exist.
 * @return {int} The number of files in the directory.
 */
Resource.prototype.filesExtant = function() {
	var filesInDir = fs.readdirSync(this.URI);
	this.fileCount = filesInDir.length;
	return filesInDir.length;
};

/**
 *      Handles the req.method (post, get, etc) and sends it to act upon the specified resourceID
 *      
 * @param  {object} req        The request object.
 * @param  {object} res        The response object.
 * @param  {int} resourceID The file id
 * @return {none}            
 */
Resource.prototype.handleRequest = function(req, res, resourceID) {
	var method = req.method.toUpperCase();

	if (method === 'POST') {
		var postResID;
		postResID = ++this.fileCount;
		if (this.fileIDIndex.indexOf(this.fileCount) === -1) {
			postResID = this.fileCount;
		} else {
			var usableIDFound = false;
			while (!usableIDFound) {
				if (this.fileIDIndex.indexOf(++postResID) == -1) {
					usableIDFound = true;
				}
			}
		}
		httpRH[method](req, res, postResID, this.URI);
	} else if (method === 'DELETE') {
		this.fileCount--;
		this.fileIDIndex.splice(this.fileIDIndex.indexOf(resourceID), 1);
		httpRH[method](req, res, resourceID, this.URI);
	} else {
		httpRH[method](req, res, resourceID, this.URI);	
	}
};

module.exports = Resource;
