'use strict';

var fs = require('fs');

module.exports = function(req, res, resourceID, fileLocation) {
	fs.readFile(fileLocation + '/data' + resourceID + '.json', function(err, data) {
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.write('There was an error in trying to read the file you specified.');
			res.end();
		} else {
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(data);	
			res.end();
		}
	});
};
