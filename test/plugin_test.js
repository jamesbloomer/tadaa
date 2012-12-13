var mocha = require('mocha'),
    assert = require("assert"),
    plugins = require("../lib/plugins.js");

describe('runner', function() {
    describe('#load()', function() {
        describe('when plugins directory exists', function() {
           it('should load correct number of plugins', function() {
                plugins.load('./test/plugins', function(err) {
                    assert.equal(plugins.plugins.length, 2); 
                    assert.equal(plugins.plugins[0].test(), true);
                    assert.equal(plugins.plugins[1].test(), true);
                    assert.equal(err, null);
                });
            }); 
        });
        
        describe('when plugins directory does not exist', function() {
           it('should return error', function() {
                plugins.plugins = [];
                plugins.load('invaliddir', function(err) {
                    assert.equal(plugins.plugins.length, 0); 
                    assert.notEqual(err, null);
                });
            }); 
        });
    });
});