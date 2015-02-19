'use strict';

var parseURL = function(reqURL) {
	// var singleAlphaNum = /[A-Za-z0-9/]/g;
	// for (var i = 0; i < reqURL.length; i++) {
	// 	console.log(reqURL[i]);
	// 	if (!singleAlphaNum.test(reqURL[i])) {
	// 		return false;
	// 	}
	// }
	var reqURLParts = reqURL.split('/');
	var dirParts = [];
	var i;
	for (i = 0; i < reqURLParts.length; i++) {
		if (reqURLParts[i] !== '' && reqURLParts[i] !== '/') {
			dirParts.push(reqURLParts[i]);
		}
	}
	console.log(dirParts);
	var fileIdentifier = 0;
	if (!isNaN(dirParts[dirParts.length - 1])) {
		fileIdentifier = dirParts[dirParts.length - 1];
	} else {
		fileIdentifier = 0;
	}

	// If an int file identifier exists, reconstruct the URL without it to get the defined route
	var urlConstructModifier = 0;
	if (fileIdentifier > 0) {
		urlConstructModifier = -1;
	}

	var route = '';
	for (i = 0; i < dirParts.length + urlConstructModifier; i++) {
		route += '/' + dirParts[i];
	}

	return {
		parts: dirParts,
		fileIdentifier: parseInt(fileIdentifier),
		route: route
	};	
};

module.exports = parseURL;
