var play = require('play');

var loop = function(current, getValue, upSound, downSound, callback) {
  getValue(function(error, result) {
		playCorrectSound(function() {
			nextTick(loop)
		});    
  });
}

var playCorrectSound = function(result, current, upSound, downSound, callback) {
	if(result > current) {
		play.sound(upSound, callback);
  } else {
		play.sound(downSound, callback);
  }
};

var start = function(getValue, upsound, downSound, callback) {
  loop(0, getValue, upSound, downSound, callback);
};

exports.start = start;
exports.playCorrectSound = playCorrectSound;
