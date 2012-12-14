var mocha = require('mocha'),
    assert = require("assert"),
    plugins = require("../lib/plugins.js");

describe('runner', function() {
    describe('#load()', function() {
        describe('when plugins directory exists', function() {
           it('should load correct number of plugins', function(done) {
                plugins.plugins = [];
                plugins.load('./test/plugins', function(err) {
                    assert.equal(plugins.plugins.length, 2); 
                    assert.equal(plugins.plugins[0].test(), true);
                    assert.equal(plugins.plugins[1].test(), true);
                    assert.equal(err, null);
                    return done();
                });
            }); 
        });
        
        describe('when plugins directory does not exist', function() {
           it('should return error and should not load plugins', function(done) {
                plugins.plugins = [];
                plugins.load('invaliddir', function(err) {
                    assert.equal(plugins.plugins.length, 0); 
                    assert.notEqual(err, null);
                    return done();
                });
            }); 
        });
        
        // TODO when plugin directory is valid but contains a file that isn't a module
    });
});