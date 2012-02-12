var vows = require('vows'),
		should = require('should'),
		sinon = require('sinon'),
		child = require('child_process'),
		tadaa = require('../lib/tadaa.js');

vows.describe('Tadaa Tests')
.addBatch({
	'when result is greater than current' : {
		topic : function() {
			sinon.stub(child, 'exec').yields(null);
			tadaa.playCorrectSound(1, 2, 'up.wav', 'down.wav', this.callback);
		},
		'should not error' : function(err, result) {
			should.not.exist(err);
		},
		'should play up.wav' : function(stub) {
			child.exec.calledWith('aplay up.wav').should.be.true;
		}
	},
	teardown: function() {
		child.exec.restore();
	}
})
.addBatch({
	'when result is less than current' : {
		topic : function() {
			sinon.stub(child, 'exec').yields(null);
			tadaa.playCorrectSound(2, 1, 'up.wav', 'down.wav', this.callback);
		},
		'should not error' : function(err, result) {
			should.not.exist(err);
		},
		'should play down.wav' : function(stub) {
			child.exec.calledWith('aplay down.wav').should.be.true;

		}
	},
	teardown: function() {
		child.exec.restore();
	}
})
.addBatch({
	'when result is equal to current' : {
		topic : function() {
			sinon.stub(child, 'exec').yields(null);
			tadaa.playCorrectSound(1, 1, 'up.wav', 'down.wav', this.callback);
		},
		'should not error' : function(err, result) {
			should.not.exist(err);
		},
		'should not play a sound' : function(stub) {
			child.exec.called.should.be.false;
		}
	},
	teardown: function() {
		child.exec.restore();
	}
})
/*
.addBatch({
	'when getValueAndPlaySound called' : {
		topic : function() {
			var stub = sinon.stub(tadaa, 'playCorrectSound').yields(null);
			tadaa.getValueAndPlaySound('up', 'down', function(callback) { callback(null, 1); });
		},
		'should not error' : function(err, result) {
			should.not.exist(err);
		},
        	'should call playCorrectSound' : {
            		tada.playCorrectSound.calledOnce.should.be.true;
       		}
	},
	teardown: function() {
		tadaa.playCorrectSound.restore();
	}
})
*/
.export(module);

