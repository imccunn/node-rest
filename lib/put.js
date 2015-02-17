'use strict';

var fs = require('fs');

module.exports = function(req, res, resourceID) {

	req.on('data', function(data) {
		var obj = JSON.parse(data);
		obj.id = resourceID;
		var toFile = JSON.stringify(obj);
		fs.writeFile('./data/data' + reqRes +'.json', toFile, function (err) {
			if (err) throw err;
			log('data' + reqRes + '.json was overwritten.');
			res.writeHead(200, {'Content-Types': 'text/plain'});
			res.write('Data replaced.');
			res.end();
		});
	});

};