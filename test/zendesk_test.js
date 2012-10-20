var mocha = require('mocha'),
	assert = require('assert'),
	sinon = require('sinon'),
	buddha = require("buddha"),
	zendesk = require('../lib/zendesk.js');

describe('Tadaa Zendesk Tests', function() {
	describe('when getOpenTickets called', function(done) {
		beforeEach(function() {
			sinon.stub(buddha, 'setCredentials');
			sinon.stub(buddha, 'getTicketCount').yields(null, 1);
		});

		afterEach(function() {
			buddha.setCredentials.restore();
			buddha.getTicketCount.restore();
		});

		it('should not error', function(done) {
			zendesk.getOpenTickets({ zenHost: "company.zendesk.com", zenEmail: "jon@a.com", zenPassword: "secure", zenView: "123456" }, function(err) {
				assert.equal(err, null);
				done();
			});
		});

		it('should call buddha methods', function(done) {
			zendesk.getOpenTickets({ zenHost: "company.zendesk.com", zenEmail: "jon@a.com", zenPassword: "secure", zenView: "123456" }, function(err, result) {
				assert(buddha.setCredentials.calledWith('company.zendesk.com', 'jon@a.com', 'secure'));
				assert(buddha.getTicketCount.calledWith('123456'));
				done();
			});
		});

		it('should get correct ticket count', function(done) {
			zendesk.getOpenTickets({ zenHost: "company.zendesk.com", zenEmail: "jon@a.com", zenPassword: "secure", zenView: "123456" }, function(err, result) {
				assert.equal(result, 1);
				done();
			});
		});
	});
});