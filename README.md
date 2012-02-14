# Tadaa

Monitor stuff via the medium of sound.

## Install

    $ npm install tadaa

## Requirements

Tadaa assumes that 'aplay' is executable available on the system (mostly true for Linux systems). 

## Usage

Tada can play an up or a down sound, depending on whether the value you are monitoring goes up or down.

    var tadaa = require('tadaa');
    var interval = 60000;   // time in ms for which the value function is called
    var up = 'up.wav';      // sound to play when value goes up
    var down = 'down.wav';  // sound to play when value goes down
    
    // Function to call to get the value
    var getValue = function(callback){
        // ...my clever value logic...
        callback(null, Math.random() * 100); } 
    
    tadaa.start(interval, up, down, getValue};
    
## Examples

Use Tadaa to:
- Play a sound when a bug is raised or closed in your bug tracking system
- Play a sound when a story is finished
- Play a sound when your favourite team scores / conceeds.
- etc...
