'use strict';

module.exports = function(req, res, resourceID) {
	if (resourceID === 0) {
		req.on('data', function(data) {
			var obj = JSON.parse(data);
			obj.id = resourceID;

			var toFile = JSON.stringify(obj);
			fs.writeFile('./data/data' + obj.id + '.json', toFile, function(err) {
				if (err) throw err;
				log('Data was written to a file.');
				console.log(toFile);
				res.writeHead(200, contentTypes.text);
				res.write('JSON sent was written to disk.');
				res.end();
			});
		});
	} else {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write('Cannot apply post request to a resource that already exists.');
		res.end();
	}
};