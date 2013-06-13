var mocha = require('mocha'),
	assert = require('assert'),
	sinon = require('sinon'),
	child = require('child_process'),
	tadaa = require('../lib/tadaa.js');

describe('Tadaa', function() {
	describe('when result is greater than current', function() {
		beforeEach(function() {
			sinon.stub(child, 'exec').yields();
		});
		
		afterEach(function() {
			child.exec.restore();
		});
		
		it('should not error when playCorrectSound called', function(done) {
            var logic = [{fn: tadaa.up, sound: "up.wav"}, {fn: tadaa.down, sound: 'down.wav'}];
			tadaa.playCorrectSound(1, 2, logic, null, function(err) {
				assert.equal(err, null);
				return done();
			});
		});

		it('should play up.wav', function(done) {
            var logic = [{fn: tadaa.up, sound: "up.wav"}, {fn: tadaa.down, sound: 'down.wav'}];
			tadaa.playCorrectSound(1, 2, logic, null, function(err) {
				assert(child.exec.calledWith('aplay up.wav'));
				return done();
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
            var logic = [{fn: tadaa.up, sound: "up.wav"}, {fn: tadaa.down, sound: 'down.wav'}];
			tadaa.playCorrectSound(2, 1, logic, null, function(err) {
				assert.equal(err, null);
				return done();
			});
		});

		it('should play down.wav', function(done) {
            var logic = [{fn: tadaa.up, sound: "up.wav"}, {fn: tadaa.down, sound: 'down.wav'}];
			tadaa.playCorrectSound(2, 1, logic, null, function(err) {
				assert(child.exec.calledWith('aplay down.wav'));
				return done();
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
            var logic = [{fn: tadaa.up, sound: "up.wav"}, {fn: tadaa.down, sound: 'down.wav'}];
			tadaa.playCorrectSound(1, 1, logic, null, function(err) {
				assert.equal(err, null);
				return done();
			});
		});

		it('should not play a sound', function(done) {
            var logic = [{fn: tadaa.up, sound: "up.wav"}, {fn: tadaa.down, sound: 'down.wav'}];
			tadaa.playCorrectSound(1, 1, logic, null, function(err) {
				assert.equal(child.exec.called, false);
				return done();
			});
		});
	});

	describe('when result drops to zero', function() {
		beforeEach(function() {
			sinon.stub(child, 'exec').yields(null);
		});
		
		afterEach(function() {
			child.exec.restore();
		});
		
		it('should not error when playCorrectSound called', function(done) {
            var logic = [{fn: tadaa.dropToZero, sound: "dropToZero.wav"}, {fn: tadaa.down, sound: 'down.wav'}];
			tadaa.playCorrectSound(1, 0, logic, null, function(err) {
				assert.equal(err, null);
				return done();
			});
		});

		it('should play dropToZero.wav', function(done) {
            var logic = [{fn: tadaa.dropToZero, sound: "dropToZero.wav"}, {fn: tadaa.down, sound: 'down.wav'}];
			tadaa.playCorrectSound(1, 0, logic, null, function(err) {
				assert(child.exec.calledWith('aplay dropToZero.wav'));
				return done();
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
            var logic = [{fn: tadaa.up, sound: "up.wav"}, {fn: tadaa.down, sound: 'down.wav'}];
			tadaa.playCorrectSound(2, 1, logic, 'afplay', function(err) {
				assert.equal(err, null);
				done();
			});
		});

		it('should play down.wav with afplay', function(done) {
            var logic = [{fn: tadaa.up, sound: "up.wav"}, {fn: tadaa.down, sound: 'down.wav'}];
			tadaa.playCorrectSound(2, 1, logic, 'afplay', function(err) {
				assert(child.exec.calledWith('afplay down.wav'));
				return done();
			});
		});
	});

	describe('when start called', function() {
        var clock;
        
		beforeEach(function() {
			sinon.stub(tadaa, 'getValueAndPlaySound');
            clock = sinon.useFakeTimers();
            tadaa.start(10, [{fn: tadaa.up, sound:'upsound'}, {fn: tadaa.down, sound:'downsound'}], 'getValue', 'getValueOptions', 'audioPlayer');
            clock.tick(15);
		});
		
		afterEach(function() {
			tadaa.getValueAndPlaySound.restore();
            clock.restore();
		});

		it('should call getValueAndPlaySound', function() {
            assert(tadaa.getValueAndPlaySound.calledOnce);
		});
	});
});