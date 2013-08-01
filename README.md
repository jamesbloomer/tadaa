# Tadaa

Monitor stuff via the medium of sound.

[![Build Status](https://secure.travis-ci.org/jamesbloomer/tadaa.png?branch=master)](http://travis-ci.org/jamesbloomer/tadaa)

## Install

    $ npm install tadaa

## Requirements

A command line executable audio player. 
Tadaa defaults to 'aplay' (available for Linux systems) but the player can be configured. 

## Usage

Tadaa can be used as a stand-alone module or using [tadaa-runner](https://github.com/jamesbloomer/tadaa-runner).

Use as a module like this:

    var tadaa = require('../lib/tadaa');

    var audioPlayer = 'aplay'   // player used to play sounds, defaults to aplay
    var interval = 10000;       // time in ms for which the value function is called
    var up = 'up.wav';          // sound to play when value goes up
    var down = 'down.wav';      // sound to play when value goes down
        
    // Logic to determine what "up" means.
    var fnup = function(currentValue, newValue) {
        return newValue > currentValue;  
    };

    // Logic to determine what "down" means.
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
        interval, 
        [{fn: fnup, sound:up}, {fn: fndown, sound:down}], 
        getValue, 
        getValueOptions, 
        audioPlayer);
    
## Tadaa logic functions included in the box
- up
- down
- nochange
- dropToZero

Just reference tadaa.up etc. in the logic array.

## Examples

Use Tadaa to

* Play a sound when a bug is raised or closed in your bug tracking system
* Play a sound when a story is finished
* Play a sound when your favourite team scores / conceeds.
* etc...

[![endorse](http://api.coderwall.com/jamesbloomer/endorsecount.png)](http://coderwall.com/jamesbloomer)
