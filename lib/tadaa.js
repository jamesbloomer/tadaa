var child = require('child_process');

var tadaa = {};

tadaa.current = 0;

tadaa.playCorrectSound = function(incurrent, result, upSound, downSound, audioPlayer, callback) {
     
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

tadaa.getValueAndPlaySound = function(upSound, downSound, getValue, getValueOptions, audioPlayer) {
	var up = upSound;
	var down = downSound;
    var player = audioPlayer;

	getValue(getValueOptions, function(error, result) {
		tadaa.playCorrectSound(tadaa.current, result, up, down, player, function(error) {
			tadaa.current = result;
			return;
		});    
	});
};

tadaa.start = function(interval, upsound, downSound, getValue, getValueOptions, audioPlayer) {
	setInterval(this.getValueAndPlaySound, interval, upsound, downSound, getValue, getValueOptions, audioPlayer);
};

module.exports = tadaa;

