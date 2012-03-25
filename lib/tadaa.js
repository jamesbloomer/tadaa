var child = require('child_process');

var current = 0;

var playCorrectSound = function(incurrent, result, upSound, downSound, audioPlayer, callback) {
    
    if(!audioPlayer)
    {
        audioPlayer = 'aplay';
    }

    if(result > incurrent) {
		return child.exec(audioPlayer + ' ' + upSound, callback);
    } else if (result < incurrent) {
		return child.exec(audioPlayer + ' ' + downSound, callback);
    }

	return callback(null);
};

var getValueAndPlaySound = function(upSound, downSound, getValue, getValueOptions, audioPlayer) {
	var up = upSound;
	var down = downSound;
    var player = audioPlayer;

	getValue(getValueOptions, function(error, result) {
		playCorrectSound(current, result, up, down, player, function(error) {
			current = result;
			return;
		});    
	});
};

var start = function(interval, upsound, downSound, getValue, getValueOptions, audioPlayer) {
	setInterval(getValueAndPlaySound, interval, upsound, downSound, getValue, getValueOptions, audioPlayer);
};

exports.start = start;
exports.getValueAndPlaySound = getValueAndPlaySound;
exports.playCorrectSound = playCorrectSound;

