var child = require('child_process'),
    async = require('async');

var tadaa = {};

tadaa.current = 0;

tadaa.playCorrectSound = function(incurrent, result, logic, audioPlayer, callback) {
    
  if(logic.length === 0) {
    return callback();
  }

  audioPlayer = audioPlayer || 'aplay';

  async.each(logic, function(item, cb){
      if (item.fn(incurrent, result)) {
        return child.exec(audioPlayer + ' ' + item.sound, cb);
      } else {
        return cb();
      }
  }, function(e) {
      return callback(e);
  });  
};

tadaa.up = function(currentValue, newValue) {
  return newValue > currentValue;  
};

tadaa.down = function(currentValue, newValue) {
  return newValue < currentValue;  
};

tadaa.nochange = function(currentValue, newValue) {
  return newValue === currentValue;  
};

tadaa.dropToZero = function(currentValue, newValue) {
  return currentValue > 0 && newValue === 0;
};

tadaa.getValueAndPlaySound = function(logicArray, getValue, getValueOptions, audioPlayer) {
	var logic = logicArray;
    var player = audioPlayer;

	getValue(getValueOptions, function(error, result) {
		tadaa.playCorrectSound(tadaa.current, result, logic, player, function(error) {
			tadaa.current = result;
			return;
		});
	});
};

tadaa.start = function(interval, logic, getValue, getValueOptions, audioPlayer) {
	setInterval(this.getValueAndPlaySound, interval, logic, getValue, getValueOptions, audioPlayer);
};

module.exports = tadaa;