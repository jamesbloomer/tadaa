var mocha = require('mocha'),
    assert = require('assert'),
    upordown = require('../lib/upordown.js');

describe('upordown', function() {
    beforeEach(function() {
        upordown.reset();    
    });
    
    it('should return up when result is greater than current', function() {
        assert.equal(upordown.getStatus(1), "up");
    });
    
    it('should return down when result is less than current', function() {
        assert.equal(upordown.getStatus(-1), "down");
    });
    
    it('should return nochange when result is the same as current', function() {
        assert.equal(upordown.getStatus(0), "nochange");
    });
    
    it('should return nochange when result is null', function() {
        assert.equal(upordown.getStatus(null), "nochange");
    });
    
    it('should return nochange when result is undefined', function() {
        assert.equal(upordown.getStatus(undefined), "nochange");
    });
});