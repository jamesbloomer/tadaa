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

var getValueAndPlaySound = function(upSound, downSound, getValue) {
	var up = upSound;
	var down = downSound;

	getValue(function(error, result) {
		playCorrectSound(current, result, up, down, function(error) {
			current = result;
			return;
		});    
	});
};

var start = function(interval, upsound, downSound, getValue) {
	setInterval(getValueAndPlaySound, interval, upsound, downSound, getValue);
};

exports.start = start;
<<<<<<< HEAD
=======
exports.getValueAndPlaySound = getValueAndPlaySound;
>>>>>>> 903e4c07a8f10eac58b84ffc40716093728a87b5
exports.playCorrectSound = playCorrectSound;

/*
// test
exports.start(30000, '~/Downloads/tada.wav', '~/Downloads/tada.wav', function(callback){
	callback(null, Math.random() * 100);
});
*/

