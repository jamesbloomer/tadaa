var child = require('child_process');

var tadaa = {};

tadaa.playCorrectSound = function(result, audioPlayer, callback) {
     
    if(!audioPlayer)
    {
        audioPlayer = 'aplay';
    }

    // TODO check for a file named result. If it doesn't exits drop back to default good and bad.
    return child.exec(audioPlayer + ' ' + result, callback);
};

tadaa.getValueAndPlaySound = function(getValue, getValueOptions, audioPlayer) {
    var player = audioPlayer;

	getValue(getValueOptions, function(error, result) {
		tadaa.playCorrectSound(tadaa.current, result, player, function(error) {
			return;
		});
	});
};

tadaa.start = function(audioPlayer, plugin) {
    setInterval(this.getValueAndPlaySound, plugin.interval, plugin.execute, audioPlayer);
};

module.exports = tadaa;

