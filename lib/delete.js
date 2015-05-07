'use strict';

var fs = require('fs');

module.exports = function(req, res, resourceID, fileLocation) {
  fs.unlink(fileLocation + '/data' + resourceID + '.json', function(err) {
    if (err) {
      console.log('There was an error deleting the file. Requested resource may not exist.');
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('There was an error deleting the file. It may not exist.');
      res.end();
      throw err;
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('The requested resource was deleted.');
      res.end();
    }
  });
};
