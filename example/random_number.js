var tadaa = require('../lib/tadaa');

var audioPlayer = 'aplay' 	// player used to play sounds, defaults to aplay
var interval = 10000;       // time in ms for which the value function is called
var up = 'up.wav';          // sound to play when value goes up
var down = 'down.wav';      // sound to play when value goes down
    
var fnup = function(currentValue, newValue) {
    return newValue > currentValue;  
};

var fndown = function(currentValue, newValue) {
    return newValue < currentValue;  
};

// Function to call to get the value
var getValue = function(options, callback){
    // ...insert your clever value logic...
    var number = Math.random() * 100;
    console.log(number);
    callback(null, number); 
} 
    
// Data to pass to the function.
var getValueOptions = { a : 1, b : 2 }; 

tadaa.start(
    'random',
    interval, 
    [{fn: fnup, sound:up}, {fn: fndown, sound:down}], 
    getValue, 
    getValueOptions, 
    audioPlayer);
