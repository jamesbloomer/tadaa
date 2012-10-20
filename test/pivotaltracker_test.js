var mocha = require('mocha'),
	assert = require('assert'),
	sinon = require('sinon'),
	pivotal = require("pivotal"),
	pivotaltracker = require('../lib/pivotaltracker.js');

describe('Tadaa Pivotal Tracker Tests', function() {
	describe('when getOpenBugs called', function() {
		beforeEach(function() {
			sinon.stub(pivotal, 'useToken');
			sinon.stub(pivotal, 'getStories').yields(null, { story : { length : 1 } });
		});

		afterEach(function() {
			pivotal.useToken.restore();
			pivotal.getStories.restore();
		});

		it('should not error', function(done) {
			pivotaltracker.getOpenBugs({ token: "myToken", projectId: "projectId" }, function(err) {
				assert.equal(err, null);
				done();
			});
		});

		it('should call pivotal methods', function(done) {
			pivotaltracker.getOpenBugs({ token: "myToken", projectId: "projectId" }, function(err) {
				// TODO change when token changes
				assert(pivotal.useToken.calledWith('myToken'));
				assert(pivotal.getStories.calledWith('projectId', { filter: "type:bug state:unscheduled,unstarted,started,finished,delivered,rejected" }));
				done();
			});
		});
	});
});