'use strict';

var chai = require('chai'),
	chaihttp = require('chai-http'),
	fs = require('fs'),
	expect = chai.expect;

chai.use(chaihttp);
require('../testIndex');

// resource 1 = test1, resourse 2 = test2
describe('Resource 1 should handle requests of all types', function() {

	var postData = {a: 1, b: 2, c: 3, d: 4, e: 5};
	var server = 'localhost:3333';
	// post 1
	it('(post request) should create resource 1', function(done) {
		chai.request(server)
			.post('/test1')
			.send(postData)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				expect(res.text).to.eql('JSON sent was written to disk.');
				done();
			});
	});
	// post 2
	it('(post request) should create resource 2', function(done) {
		chai.request(server)
			.post('/test1')
			.send(postData)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				expect(res.text).to.eql('JSON sent was written to disk.');
				done();
			});
	});
	// post 3
	it('(post request) should create resource 3', function(done) {
		chai.request(server)
			.post('/test1')
			.send(postData)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				expect(res.text).to.eql('JSON sent was written to disk.');
				done();
			});
	});
	// get 1
	it('(get request) should retrieve data from file on server and send back as application/json.', function(done) {
		chai.request(server)
			.get('/test1/1')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				expect(res).to.be.json; // jshint ignore: line
				done();
			});
	});
	// get 2
	it('(get request) should retrieve data from file on server and send back as application/json.', function(done) {
		chai.request(server)
			.get('/test1/2')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				expect(res).to.be.json; // jshint ignore: line
				done();
			});
	});

	var putData = {x: 2, y: 3, z: 4};
	// put 2
	it('(put request) should replace data at a created resource.', function(done) {
		chai.request(server)
			.put('/test1/2')
			.send(putData)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				putData.id = 2;
				expect(res.text).to.eql('Data replaced at specified endpoint.\n New data: ' + JSON.stringify(putData) + '\n');
				done();
			});
	});
	// patch 3
	it('(patch request) should replace any with resource or add new data.', function(done) {
		var sendData = {a: 22, b: 33, f: 12, s: 99};
		var modData = {a: 22, b: 33, c: 3, d: 4, e: 5, id: 3, f: 12, s: 99};
		chai.request(server)
			.patch('/test1/3')
			.send(sendData)
			.end(function(err, res) {
				var fileData = JSON.parse(fs.readFileSync('./data/test1/data3.json'));
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				expect(JSON.stringify(fileData)).to.eql(JSON.stringify(modData));
				done();
			});
	});
	// delete 2
	it('(delete request) should delete the requested resource.', function(done) {
		chai.request(server)
			.delete('/test1/2')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				expect(res.text).to.eql('The requested resource was deleted.');	
				done();
			});
	});

	// put 1
	it('(put request) should replace data at a created resource.', function(done) {
		chai.request(server)
			.put('/test1/1')
			.send(putData)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				putData.id = 1;
				expect(res.text).to.eql('Data replaced at specified endpoint.\n New data: ' + JSON.stringify(putData) + '\n');
				done();
			});
	});
			
	// put 3
	it('(put request) should replace data at a created resource.', function(done) {
		chai.request(server)
			.put('/test1/3')
			.send(putData)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				putData.id = 3;
				expect(res.text).to.eql('Data replaced at specified endpoint.\n New data: ' + JSON.stringify(putData) + '\n');
				done();
			});
	});

	// patch 1
	it('(patch request) should replace any with resource or add new data.', function(done) {
		var sendData = {x: 50, a: 22, b: 33, f: 12, s: 99};
		var modData = {x: 50, y: 3, z: 4, id: 1, a: 22, b: 33, f: 12, s: 99};
		chai.request(server)
			.patch('/test1/1')
			.send(sendData)
			.end(function(err, res) {
				var fileData = JSON.parse(fs.readFileSync('./data/test1/data1.json'));
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				expect(JSON.stringify(fileData)).to.eql(JSON.stringify(modData));
				done();
			});
	});

	after(function() {
		fs.unlinkSync('./data/test1/data1.json');
		fs.unlinkSync('./data/test1/data3.json');
		fs.rmdirSync('./data/test1');
		fs.rmdirSync('./data/test2');
		fs.rmdirSync('./data', function(err) {
			if (err) {throw err;}
		});
	});
});
