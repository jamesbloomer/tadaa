var fs = require("fs"),
    async = require("async")


var runner = {};


runner.plugins = [];

runner.run = function() {
    // './plugins/'
};

runner.loadPlugins = function(pluginsDir, callback) {
    
    fs.readdir(pluginsDir, function(err, files) {
        if (err) {
            // TODO handle error
            return callback(err);
        }

        async.forEach(files, function(item, callback) {
           runner.plugins.push(require(pluginsDir + '/' + item));  
        },function(err) {
            // TODO handle errors
            return callback(err);
        });
        
        return;
    });
};

module.exports = runner;