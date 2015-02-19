'use strict';

var fs = require('fs');

module.exports = function(req, res, resourceID, fileLocation) {
	var input = '';
	req.on('data', function(data) {
		var obj = JSON.parse(data);
		obj.id = resourceID;

		var toFile = JSON.stringify(obj);
		fs.writeFile(fileLocation + '/data' + obj.id + '.json', toFile, function(err) {
			if (err) {
				throw err;
			} else {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write('JSON sent was written to disk.');
				res.end();			
			}
		});
	});
};
