# Tadaa

Monitor stuff via the medium of sound.

[![Build Status](https://secure.travis-ci.org/jamesbloomer/tadaa.png?branch=master)](http://travis-ci.org/jamesbloomer/tadaa)

## Install

    $ npm install tadaa

## Requirements

A command line executable audio player. 
Tadaa defaults to 'aplay' (available for Linux systems) but the player can be configured. 

## Usage

Tada can play a sound, depending the value you are monitoring.

    var tadaa = require('tadaa');
    var audioPlayer = 'mplayer' // player used to play sounds, defaults to aplay
    var interval = 60000;       // time in ms for which the value function is called
    var up = 'up.wav';          // sound to play when value goes up
    var down = 'down.wav';      // sound to play when value goes down
    
    var fnup = function(currentValue, newValue) {
        return newValue > currentValue;  
    };
    
    var fndown = function(currentValue, newValue) {
        return newValue < currentValue;  
    };

    // Function to call to get the value
    var getValue = function(callback){
        // ...my clever value logic...
        callback(null, Math.random() * 100); } 
        
    var getValueOptions = { a : 1, b : 2 }; // Data to pass to the function.
    
    tadaa.start(interval, [{fn: fnup, sound:up}, {fn: fndown, sound:down}], getValue, getValueOptions, audioPlayer};
    
## Tadaa logic functions included in the box
- up
- down
- nochange
- zero

## Examples

Use Tadaa to

* Play a sound when a bug is raised or closed in your bug tracking system
* Play a sound when a story is finished
* Play a sound when your favourite team scores / conceeds.
* etc...

[![endorse](http://api.coderwall.com/jamesbloomer/endorsecount.png)](http://coderwall.com/jamesbloomer)
