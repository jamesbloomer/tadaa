var vows = require('vows'),
		should = require('should'),
		sinon = require('sinon'),
		play = require('play'),
		tadaa = require('../lib/tadaa.js');

vows.describe('Tadaa Tests')
.addBatch({
	'when result is greater than current' : {
		topic : function() {
			sinon.stub(play, 'sound').yields(null);
			tadaa.playCorrectSound(2, 1, 'up.wav', 'down.wav', this.callback);
		},
		'should not error' : function(err, result) {
			should.not.exist(err);
		},
		'should call play with up.wav' : function(stub) {
			play.sound.calledWith('up.wav').should.be.true;
		},
	},
	teardown: function() {
		play.sound.restore();
	}
})
.addBatch({
	'when result is less than current' : {
		topic : function() {
			sinon.stub(play, 'sound').yields(null);
			tadaa.playCorrectSound(1, 2, 'up.wav', 'down.wav', this.callback);
		},
		'should not error' : function(err, result) {
			should.not.exist(err);
		},
		'should call play with down.wav' : function(stub) {
			play.sound.calledWith('down.wav').should.be.true;
		},
	},
	teardown: function() {
		play.sound.restore();
	}
})
/*
.addBatch({
	'when start called' : {
		topic : function() {
			var stub = sinon.stub(tadaa, 'playCorrectSound').yields(null);
			tadaa.start('* * * * * *', function(callback) { callback(null, 1); });
		},
		'should not error' : function(err, result) {
			should.not.exist(err);
		},
	},
	teardown: function() {
		tadaa.playCorrectSound.restore();
	}
})
*/
.export(module);

