var child = require('child_process');

var playCorrectSound = function(result, current, upSound, downSound, callback) {
	if(result > current) {
		child.exec('aplay ' + upSound, callback);
  } else {
		child.exec('aplay ' + downSound, callback);
  }
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
	setInterval(getValueAndPlaySound, interval, 0, upsound, downSound, getValue);
};

exports.start = start;
exports.playCorrectSound = playCorrectSound;

exports.start(30, '~/Downloads/tada.wav', '~/Downloads/tada.wav', function(callback){
	callback(null, 1);
});


