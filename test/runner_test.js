var mocha = require('mocha'),
    assert = require("assert"),
    sinon = require('sinon'),
    runner = require("../lib/runner.js"),
    tadaa = require('../lib/tadaa.js'),
    plugins = require('../lib/plugins.js');

describe('runner', function() {
    describe('#run()', function() {
        
        beforeEach(function() {
    		sinon.stub(tadaa, 'start');
            sinon.stub(plugins, 'load');
		});
		
		afterEach(function() {
			tadaa.start.restore();
            plugins.load.restore();
		});

        it('should call tadaa.start for each plugin', function(done) {
            plugins.plugins = [{}, {}];
            runner.run('player', function() {
                assert(tadaa.start.calledTwice);
                done();
            });
        });
    });
});