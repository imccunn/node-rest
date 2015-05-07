'use strict';

var fs = require('fs');

module.exports = function(req, res, resourceID, fileLocation) {
  var input = '';
  req.on('data', function(data) {
    input += data.toString('utf-8');
  });

  req.on('end', function(data) {
    var dataSentToPatch = JSON.parse(input);

    // Read the file that was requested
    fs.readFile(fileLocation + '/data' + resourceID + '.json', function(err, data) {
      if (err) {
        throw err;
      } else {
        var jsonResource = JSON.parse(data);

        // Compare the sent data with the resource data
        for (var key in dataSentToPatch) {
          if (!jsonResource[key]) {
            jsonResource[key] = dataSentToPatch[key];
          }
          jsonResource[key] = dataSentToPatch[key];
        }
        var toFile = JSON.stringify(jsonResource);
        fs.writeFile(fileLocation + '/data' + resourceID + '.json', toFile, function(err) {
          if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write('There was a server error when writing the patched information.');
            res.end();
            throw err;
          } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('Data successfully patched.');
            res.end();
          }
        });
      }
    });
  });
};
