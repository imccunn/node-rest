'use strict';

var fs = require('fs');

module.exports = function(req, res, resourceID) {
	fs.unlink('./data/data' + resourceID + '.json', function(err) {
		if (err) {
			log('There was an error deleting the file. Requested resource may not exist.');
			res.writeHead(200, contentTypes.text);
			res.write('There was an error deleting the file. It may not exist.');
			res.end();
			throw err;
		} else {
			log('Resource: ' + resourceID + ' was deleted from the server.');
			res.writeHead(200, contentTypes.text);
			res.write('The requested resource was deleted.');
			res.end();
		}
	});
};