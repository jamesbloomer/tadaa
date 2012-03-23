var vows = require('vows'),
		should = require('should'),
		sinon = require('sinon'),
		buddha = require("buddha"),
		zendesk = require('../lib/zendesk.js');

vows.describe('Tadaa Zendesk Tests')
.addBatch({
	'when getOpenTickets called ' : {
		topic : function() {
			sinon.stub(buddha, 'setCredentials');
			sinon.stub(buddha, 'getTicketCount').yields(null, 1);
			zendesk.getOpenTickets({ zenHost: "company.zendesk.com", zenEmail: "jon@a.com", zenPassword: "secure", zenView: "123456" }, this.callback);
		},
		'should not error' : function(err, result) {
			should.not.exist(err);
		},
		'should call buddha methods' : function(err, result) {
			buddha.setCredentials.calledWith('company.zendesk.com', 'jon@a.com', 'secure').should.be.true;
			buddha.getTicketCount.calledWith('123456').should.be.true;
		},
		'should get correct ticket count' : function(err, result) {
			 result.should.eql(1);
    }
	},
	teardown: function() {
		buddha.setCredentials.restore();
		buddha.getTicketCount.restore();
	}
})
.export(module);
