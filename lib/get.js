'use strict';

module.exports = function (req, res, resourceID) {
	fs.readFile('./data/data' + resourceID + '.json', function(err, data) {
		if (err) {
			res.writeHead(500, contentTypes.text);
			res.write('content not found');
			res.end();
		} else {
			log('data' + resourceID + '.json was requested and sent.');
			res.writeHead(200, contentTypes.text);
			res.write('You requested data: ' + data);
			res.end();
		}
	});

};