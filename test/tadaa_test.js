var mocha = require('mocha'),
	assert = require('assert'),
	sinon = require('sinon'),
	child = require('child_process'),
	tadaa = require('../lib/tadaa.js');

describe('Tadaa', function() {
	describe('when result is greater than current', function() {
		beforeEach(function() {
			sinon.stub(child, 'exec').yields(null);
		});
		
		afterEach(function() {
			child.exec.restore();
		});
		
		it('should not error when playCorrectSound called', function(done) {
			tadaa.playCorrectSound(1, 2, 'up.wav', 'down.wav', null, function(err) {
				assert.equal(err, null);
				done();
			});
		});

		it('should play up.wav', function(done) {
			tadaa.playCorrectSound(1, 2, 'up.wav', 'down.wav', null, function(err) {
				assert(child.exec.calledWith('aplay up.wav'));
				done();
			});
		});
	});

	describe('when result is less than current', function() {
		beforeEach(function() {
			sinon.stub(child, 'exec').yields(null);
		});
		
		afterEach(function() {
			child.exec.restore();
		});
		
		it('should not error when playCorrectSound called', function(done) {
			tadaa.playCorrectSound(2, 1, 'up.wav', 'down.wav', null, function(err) {
				assert.equal(err, null);
				done();
			});
		});

		it('should play down.wav', function(done) {
			tadaa.playCorrectSound(2, 1, 'up.wav', 'down.wav', null, function(err) {
				assert(child.exec.calledWith('aplay down.wav'));
				done();
			});
		});
	});

	describe('when result is equal to current', function() {
		beforeEach(function() {
			sinon.stub(child, 'exec').yields(null);
		});
		
		afterEach(function() {
			child.exec.restore();
		});
		
		it('should not error when playCorrectSound called', function(done) {
			tadaa.playCorrectSound(1, 1, 'up.wav', 'down.wav', null, function(err) {
				assert.equal(err, null);
				done();
			});
		});

		it('should not play a sound', function(done) {
			tadaa.playCorrectSound(1, 1, 'up.wav', 'down.wav', null, function(err) {
				assert.equal(child.exec.called, false);
				done();
			});
		});
	});

	describe('when audio player is set', function() {
		beforeEach(function() {
			sinon.stub(child, 'exec').yields(null);
		});
		
		afterEach(function() {
			child.exec.restore();
		});
		
		it('should not error', function(done) {
			tadaa.playCorrectSound(2, 1, 'up.wav', 'down.wav', 'afplay', function(err) {
				assert.equal(err, null);
				done();
			});
		});

		it('should play down.wav with afplay', function(done) {
			tadaa.playCorrectSound(2, 1, 'up.wav', 'down.wav', 'afplay', function(err) {
				assert(child.exec.calledWith('afplay down.wav'));
				done();
			});
		});
	});

	describe('when start called', function() {
		beforeEach(function() {
			sinon.stub(tadaa, 'getValueAndPlaySound');
            var clock = sinon.useFakeTimers();
            tadaa.start(10, 'upsound', 'downSound', 'getValue', 'getValueOptions', 'audioPlayer');
            clock.tick(15);
		});
		
		afterEach(function() {
			tadaa.getValueAndPlaySound.restore();
		});

		it('should call getValueAndPlaySound', function() {
            assert(tadaa.getValueAndPlaySound.calledOnce);
		});
	});
});
