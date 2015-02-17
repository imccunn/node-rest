'use strict';

var fs = require('fs');

module.exports = function(req, res, resourceID) {
	var input = '';
	req.on('data', function(data) {
		input += data.toString('utf-8');
	});

	req.on('end', function(data) {
		var dataSentToPatch = JSON.parse(input);

		// Read the file that was requested
		fs.readFile('./data/data' + resourceID + '.json', function(err, data) {
			if (err) throw err;
			var jsonResource = JSON.parse(data);

			// Compare the sent data with the resource data
			for (var key in dataSentToPatch) {
				if(!jsonResource[key]) {
					jsonResource[key] = dataSentToPatch[key];
				} else if (dataSentToPatch[key] !== jsonResource[key]) {
					jsonResource[key] = dataSentToPatch[key];
				}
			}

			var toFile = JSON.stringify(jsonResource);
			fs.writeFile('./data/data' + resourceID + '.json', toFile, function(err) {
				if (err) {
					res.writeHead(500, contentTypes.text);
					res.write('There was a server error when writing the patched information.');
					res.end();
					throw err;
				} else {
					log('data' + resourceID + '.json was patched');
					res.writeHead(200, contentTypes.text);
					res.write('Data successfully patched.');
					res.end();
				}
			});
		});
	});
};