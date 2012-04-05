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
			tadaa.playCorrectSound(1, 2, 'up.wav', 'down.wav', null, this.callback);
		}, 
		'should not error' : function(err, result) {
			should.not.exist(err);
		},
		'should play up.wav' : function() {
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
			tadaa.playCorrectSound(2, 1, 'up.wav', 'down.wav', null, this.callback);
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
			tadaa.playCorrectSound(1, 1, 'up.wav', 'down.wav', null, this.callback);
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
.addBatch({
    'when audio player is set' : {
		topic : function() {
			sinon.stub(child, 'exec').yields(null);
			tadaa.playCorrectSound(2, 1, 'up.wav', 'down.wav', 'afplay', this.callback);
		},
		'should not error' : function(err, result) {
			should.not.exist(err);
		}, 
		'should play down.wav with afplay' : function(stub) {
			child.exec.calledWith('afplay down.wav').should.be.true;
		}
	},
	teardown: function() {
		child.exec.restore(); 
	}
})
.addBatch({
    'when start called' : {
        topic: function() { 
            sinon.stub(tadaa, 'getValueAndPlaySound').yields(null);
            var clock = sinon.useFakeTimers();
            tadaa.start(10, 'upsound', 'downSound', 'getValue', 'getValueOptions', 'audioPlayer');
            clock.tick(15);  
        },
        'should call getValueAndPlaySound': function(err, result) {
            tadaa.getValueAndPlaySound
                 .calledOnce
                 .should.be.true;
        }
    },
    teardown: function() {
		tadaa.getValueAndPlaySound.restore(); 
	}
})
/*
.addBatch({
    'when getValueAndPlaySound called' : {
		topic : function() {
			sinon.stub(tadaa, 'playCorrectSound').yields(null);
            var getValue = function(options, callback) {
                return callback(null, 1);
            };
            
			tadaa.getValueAndPlaySound('up', 'down', getValue);
		},
		'should not error' : function(err, result) {
			should.not.exist(err);
		},
		'should call playCorrectSound' : function(err, result) {
			tadaa.playCorrectSound.calledOnce.should.be.true;
		} 
	},
	teardown: function() {
		tadaa.playCorrectSound.restore();
	}
})
*/
.export(module);

