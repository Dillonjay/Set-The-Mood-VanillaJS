var request = require('request');
var expect = require('chai').expect;


describe('server', function() {
	// Test to make sure Html file is sent when requested.
	it('should respond with a status of 200 for main page',function(done) {
  		request('http://localhost:8080', function(error, response, body) {
      		expect(response.statusCode).to.equal(200);
      		expect()
      		done();
   		});
  	});
  	// Test to make sure JS file is sent when requested. 
	it('should respond with a status of 200 when asked for main.js', function(done){
  		request('http://localhost:8080/main.js', function(error,response, body){
  			expect(response.statusCode).to.equal(200);
  			done();
  		})
 	})



});
