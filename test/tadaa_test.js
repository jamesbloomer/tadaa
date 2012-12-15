var mocha = require('mocha'),
	assert = require('assert'),
	sinon = require('sinon'),
	child = require('child_process'),
	tadaa = require('../lib/tadaa.js');

describe('Tadaa', function() {
	describe('when audio player is set', function() {
		beforeEach(function() {
			sinon.stub(child, 'exec').yields(null);
		});
		
		afterEach(function() {
			child.exec.restore();
		});
		
		it('should not error', function(done) {
			tadaa.playCorrectSound('result.wav', 'afplay', function(err) {
				assert.equal(err, null);
				done();
			});
		});

		it('should play down.wav with afplay', function(done) {
			tadaa.playCorrectSound('result.wav', 'afplay', function(err) {
				assert(child.exec.calledWith('afplay result.wav'));
				done();
			});
		});
	});

    describe('when audio player is not set', function() {
    	beforeEach(function() {
			sinon.stub(child, 'exec').yields(null);
		});
		
		afterEach(function() {
			child.exec.restore();
		});
		
		it('should not error', function(done) {
			tadaa.playCorrectSound('result.wav', null, function(err) {
				assert.equal(err, null);
				done();
			});
		});

		it('should play sound with aplay', function(done) {
			tadaa.playCorrectSound('result.wav', null, function(err) {
				assert(child.exec.calledWith('aplay result.wav'));
				done();
			});
		});
	});
    
    // TODO fix
//	describe('when start called', function() {
//		beforeEach(function() {
//			sinon.stub(tadaa, 'getValueAndPlaySound');
//            var clock = sinon.useFakeTimers();
//            var plugin = {};
//            console.log('before start');
//            tadaa.start('audioPlayer', plugin);
//            console.log('after start');
//            clock.tick(15);
//            console.log('after tick');
//		});
//		
//		afterEach(function() {
//			tadaa.getValueAndPlaySound.restore();
//		});
//
//		it('should call getValueAndPlaySound', function(done) {
//            console.log('before assert');
//            assert(tadaa.getValueAndPlaySound.calledOnce);
//            console.log('after assert');
//            done();
//		});

        // Should call plugin.interval
        
        // should pass plugin.execute
//	});
});
