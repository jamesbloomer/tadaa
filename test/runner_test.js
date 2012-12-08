var mocha = require('mocha'),
    assert = require("assert"),
    runner = require("../lib/runner.js");

describe('runner', function() {
    describe('loadPlugins', function() {
        it('should load correct number of plugins', function() {
            runner.loadPlugins('./test/plugins', function(err) {
                assert.equal(err, null);
                assert.equal(runner.plugins.length, 2); 
                assert.equal(runner.plugins[0].test, true);
                assert.equal(runner.plugins[1].test, true);
            });
        });
    });
});