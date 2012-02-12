var child = require('child_process');

var playCorrectSound = function(result, current, upSound, downSound, callback) {
	console.log(current + ' ' + result);	

	if(result > current) {
		return child.exec('aplay ' + upSound, callback);
  } else if (result < current) {
		return child.exec('aplay ' + downSound, callback);
  }

	return callback(null);
};

var getValueAndPlaySound = function(current, upSound, downSound, getValue) {
	var up = upSound;
	var down = downSound;
	var c = current;

	getValue(function(error, result) {
		playCorrectSound(result, c, up, down, function(error) {
			current = result;
			return;
		});    
	});
};

var start = function(interval, upsound, downSound, getValue) {
	var current = 0;
	setInterval(getValueAndPlaySound, interval, current, upsound, downSound, getValue);
};

exports.start = start;
exports.playCorrectSound = playCorrectSound;

exports.start(30000, '~/Downloads/tada.wav', '~/Downloads/tada.wav', function(callback){
	callback(null, 1);
});

