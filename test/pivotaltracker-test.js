var vows = require('vows'),
		should = require('should'),
		sinon = require('sinon'),
		pivotal = require("pivotal"),
		pivotaltracker = require('../lib/pivotaltracker.js');

vows.describe('Tadaa Pivotal Tracker Tests')
.addBatch({
	'when getOpenBugs called ' : {
		topic : function() {
			sinon.stub(pivotal, 'useToken');
			sinon.stub(pivotal, 'getStories').yields(null);
			pivotaltracker.getOpenBugs(this.callback);
		},
		'should not error' : function(err, result) {
			should.not.exist(err);
		},
		'should call pivotal methods' : function(err, result) {
			// TODO change when token changes
			pivotal.useToken.calledWith('myToken').should.be.true;
			pivotal.getStories.calledWith('projectId', { filter: "type:bug state:unscheduled,unstarted,started,finished,delivered,rejected" }).should.be.true;
		},
		'should get correct story length' : function(err, result) {
			// TODO
			should.not.exist(err);
    }
	},
	teardown: function() {
		pivotal.useToken.restore();
        pivotal.getStories.restore();
	}
})
.export(module);
