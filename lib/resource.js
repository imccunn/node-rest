'use strict';

var Resource = exports = module.exports = {}; // jshint ignore: line

var httpRH = require('./httpRequestMethods');

function Resource(path) {
	this.id;
	this.path = path;
	this.root = './data/';
	this.URI = this.root + this.path;
	this.fileCount = this.filesExtant();
	this.fileIDIndex = [];
}

Resource.prototype.initDir = function() {
	// Program relies on './data' directory, check existence
	if (!fs.existsSync(this.URI)) {
	  fs.mkdirSync(this.URI);
	}
};

Resource.prototype.filesExtant = function() {
	var filesInDir = fs.readdirSync(this.URI);
	this.fileCount = filesInDir.length;
	return filesInDir.length;
};

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
		httpRH[method](req, res, postResID);
	} else if (method === 'DELETE') {
		this.fileCount--;
		this.fileIDIndex.splice(this.fileIDIndex.indexOf(resourceID), 1);
		httpRH[method](req, res, resourceID);
	} else {
		httpRH[method](req, res, resourceID);	
	}
	
};