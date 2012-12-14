var async = require('async'),
    plugins = require('./plugins.js'),
    tadaa = require('./tadaa.js');

var runner = {};

runner.run = function(audioPlayer, callback) {
    plugins.load('../plugins');
    
    async.forEach(plugins.plugins, function(plugin, callback) {
        tadaa.start(audioPlayer, plugin);
        return callback();
    },function(err) {
        return callback(err);
    });
};

module.exports = runner;