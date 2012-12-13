var fs = require("fs"),
    async = require("async"),
    path = require('path');

var plugins = {};

plugins.plugins = [];

plugins.load = function(pluginsDir, callback) {
    
    fs.readdir(pluginsDir, function(err, files) {
        if (err) {
            return callback(err);
        }

        async.forEach(files, function(item, done) {
            try {
                var fullPath = path.join(pluginsDir, item);
                var resolvedPath = path.resolve(fullPath);
                var plugin = require(resolvedPath);
                plugins.plugins.push(plugin);
                return done();
            } catch(err) {
                return done(err);                
            }
        },function(err) {
            return callback(err);
        });
    });
};

module.exports = plugins;