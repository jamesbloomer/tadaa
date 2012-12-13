var async = require('async'),
    plugins = require('./plugins.js')

var runner = {};

runner.run = function(callback) {
    plugins.load('../plugins');
    
    async.forEach(plugins.plugins, function(plugin, callback) {
          
    },function(err) {
        return callback(err);
    });
};

module.exports = runner;