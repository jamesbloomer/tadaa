var child = require('child_process');

var current = 0;

var playCorrectSound = function(incurrent, result, upSound, downSound, callback) {

    if(result > incurrent) {
		return child.exec('aplay ' + upSound, callback);
    } else if (result < incurrent) {
		return child.exec('aplay ' + downSound, callback);
    }

	return callback(null);
};

var getValueAndPlaySound = function(upSound, downSound, getValue, getValueOptions) {
	var up = upSound;
	var down = downSound;

	getValue(getValueOptions, function(error, result) {
		playCorrectSound(current, result, up, down, function(error) {
			current = result;
			return;
		});    
	});
};

var start = function(interval, upsound, downSound, getValue, getValueOptions) {
	setInterval(getValueAndPlaySound, interval, upsound, downSound, getValue, getValueOptions);
};

exports.start = start;
exports.getValueAndPlaySound = getValueAndPlaySound;
exports.playCorrectSound = playCorrectSound;

/*
// test
exports.start(30000, '~/Downloads/tada.wav', '~/Downloads/tada.wav', function(callback){
	callback(null, Math.random() * 100);
});
*/

