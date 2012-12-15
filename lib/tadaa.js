var child = require('child_process');

var tadaa = {};

tadaa.playCorrectSound = function(result, audioPlayer, callback) {
    if(result === null) {
        return callback();
    }
    
    if(!audioPlayer)
    {
        audioPlayer = 'aplay';
    }

    // TODO check for a file named result. If it doesn't exits drop back to default good and bad.
    // TODO add an extension. What's the default?
    return child.exec(audioPlayer + ' ' + result, callback);
};

tadaa.getValueAndPlaySound = function(execute, audioPlayer) {
    var player = audioPlayer;

	execute(function(error, result) {
		tadaa.playCorrectSound(result, player, function(error) {
			return;
		});
	});
};

tadaa.start = function(audioPlayer, plugin) {
    setInterval(this.getValueAndPlaySound, plugin.interval, plugin.execute, audioPlayer);
};

module.exports = tadaa;

