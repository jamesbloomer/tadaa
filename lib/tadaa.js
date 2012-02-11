var play = require('play'),
		cron = require('cron');

var playCorrectSound = function(result, current, upSound, downSound, callback) {
	if(result > current) {
		play.sound(upSound, callback);
  } else {
		play.sound(downSound, callback);
  }
};

var start = function(cronPattern, getValue, upsound, downSound) {
	var current = 0;
	cron.CronJob(cronPattern, function() {
		getValue(function(error, result) {
			playCorrectSound(result, current, upSound, downSound, function() {
				current = result;
				return;
			});    
  	});
	});
};

exports.start = start;
exports.playCorrectSound = playCorrectSound;


exports.test = start('* * * * * *', function(callback) { 
	console.log('Get value');
	callback();
}, '~/Downloads/tada.wav');
