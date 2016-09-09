var request = require('request');
var expect = require('chai').expect;


describe('server', function() {
  it('should respond with something',function(done) {
  	 request('http://localhost:8080', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });



});
