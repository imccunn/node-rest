'use strict';

var fs = require('fs');

module.exports = function(req, res, resourceID, fileLocation) {

	req.on('data', function(data) {
		var obj = JSON.parse(data);
		obj.id = resourceID;
		var toFile = JSON.stringify(obj);
		fs.writeFile(fileLocation + '/data' + resourceID + '.json', toFile, function(err) {
			if (err) {
				throw err;
			} else {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write('Data replaced at specified endpoint.\n New data: ' + toFile + '\n');
				res.end();
			}
		});
	});
};
